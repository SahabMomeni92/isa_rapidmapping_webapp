import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import FileUploadParser, MultiPartParser
from django.conf import settings
from .serializers import Workspace_Serializers , GeospatialFile_Serializers
from .models import Geoserver,Workspace , GeospatialFile
from django.db.models import Max
import zipfile

class CreateWorkSpaceView(APIView):     
     permission_classes = [AllowAny,] 
     def post(self,request):
         geoserver_url = getattr(settings, "GEOSERVER_URL", None) 
         geoserver = Geoserver.objects.get(url_address = geoserver_url)
         request.data['geoserver'] = geoserver.pk
         print(request.data)
         serializer = Workspace_Serializers(data = request.data)           
         print(serializer)  
         if serializer.is_valid(raise_exception=True):
            resp = geoserver.CreateWorkSpace(request.data['system_name'])
            print(resp)
            if resp['status_code']==201:
                serializer.save()
                resp['id'] =  Workspace.objects.get(system_name = request.data['system_name']).pk
                
            return Response(resp,status=status.HTTP_201_CREATED) 

class DeleteWorkSpaceView(APIView):     
     permission_classes = [AllowAny,] 
     def delete(self,request,pk):     
         try:
            workspace = Workspace.objects.get(pk=pk)
            workspace_name = workspace.system_name
            # print('system_name:' + workspace.system_name)
            resp = workspace.geoserver.DeleteWorkSpace(workspace_name)
            if resp['status_code']==200:
                workspace.delete()
            return Response(resp,status=status.HTTP_200_OK)
         except Exception as e:         
            return Response({"text":':به نظر در سرور یک مشکل وجود دارد',
            "error":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateGeoSpatialFile(APIView):     
     permission_classes = [AllowAny,] 
     parser_classes = [MultiPartParser]
     print('started')
     def post(self,request):
        print(request.data)
        if request.data['file_type'] not in ['raster','vector']:
                raise Exception('این فرمت داده پشتیبانی نمی شود')               
        workspace = Workspace.objects.get(pk=request.data['workspace'])      
        data_file = request.FILES['file'].read()          
        file_type = request.data['file_type']
        if file_type == 'vector':
                    print('vector')
                    with zipfile.ZipFile(request.FILES['file'], 'r') as zip_ref:               
                        file_name = zip_ref.infolist()[0].filename.split('.')[0]
                        request.data['system_name'] = file_name 
        else:
                        file_name = request.FILES['file'].name.split('.')[0] 
                        max_id =  GeospatialFile.objects.filter(file_type = 'raster').count()
                        request.data['system_name'] = workspace.system_name + '_' + str(max_id+1) + '_' + file_name
                        print( request.data['system_name'])
        serializer = GeospatialFile_Serializers(data = request.data)                  
        if serializer.is_valid(raise_exception=True):                
                if file_type == 'vector':                 
                    print('vector')           
                    resp = workspace.Create_SHP_DataStore(data_file,file_name)
                    print('is worl')
                else:
                    
                    resp = workspace.create_coveragestore(data_file,request.data['system_name'])    
                if resp['status_code'] ==201:
                    serializer.save()
                    resp['system_name'] = request.data['system_name']
                    resp['id'] = GeospatialFile.objects.get(system_name = request.data['system_name']).pk
                return Response(resp,status=status.HTTP_201_CREATED)          