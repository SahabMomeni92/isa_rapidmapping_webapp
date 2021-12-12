from django.db.models.query import QuerySet
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from .serializers import ExpertMapSerializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from rest_framework.response import Response
from . models import Draw_map, Expert_map
from gdms.models import GeospatialFile
from .serializers import ExpertMapSerializers,DrawMapSerializers
# from django.forms.widgets import SelectDateWidget
from rest_framework.generics import ListAPIView,GenericAPIView,RetrieveAPIView
import subprocess
import os
class CreateExpertMap(APIView):
    permission_classes = [AllowAny,] 
    parser_classes = [MultiPartParser] 
    def post(self , request):
            serializer = ExpertMapSerializers(data = request.data)  
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)

class ExpertMap_List(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExpertMapSerializers
    queryset = Expert_map.objects.all()

class ExpertMap_Detail(APIView):
    permission_classes = [AllowAny,] 

    # def get_object(self, pk):
    #     try:
    #         return Expert_map.objects.get(pk=pk)
    #     except Expert_map.DoesNotExist:
    #         raise Http404

    # def get(self, request, pk, format=None):
    #     expert_map = self.get_object(pk)
    #     serializer = ExpertMapSerializers(expert_map)
    #     return Response(serializer.data)

    def get(self,request,pk):

        qs = Expert_map.objects.get(pk=pk)

        serializers = ExpertMapSerializers(qs)

        return Response(serializers.data,status=status.HTTP_200_OK)
    
class InsertDrawMap(APIView):
    permission_classes = [AllowAny,] 
    # parser_classes = [MultiPartParser] 
    def post(self , request):
            serializer = DrawMapSerializers(data = request.data)  
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
    
class DrawMap_Detail(APIView):
    permission_classes = [AllowAny,] 
    parser_classes = [MultiPartParser] 
    # def get_object(self, pk):
    #     try:
    #         return Expert_map.objects.get(pk=pk)
    #     except Expert_map.DoesNotExist:
    #         raise Http404

    # def get(self, request, pk, format=None):
    #     expert_map = self.get_object(pk)
    #     serializer = ExpertMapSerializers(expert_map)
    #     return Response(serializer.data)

    def get(self,request,pk):

        qs = Draw_map.objects.get(pk=pk)

        serializers = DrawMapSerializers(qs)

        data = serializers.data

        # setattr(serializers.data, 'tiff_address', GeospatialFile.objects.get(pk=serializers.data['tiff_file']).file)

        data['tiff_address']  =  GeospatialFile.objects.get(pk=serializers.data['tiff_file']).file.path 

        # print(data)

        return Response(data,status=status.HTTP_200_OK)    

    def patch(self,request,pk):        
        qs = Draw_map.objects.get(pk=pk)
        serializer = DrawMapSerializers(qs,data = request.data,partial=True)      
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    

    def post(self,request,pk):
        print('salam 1')
        replica_sync_command = "C:\\Python27\\ArcGIS10.5\\python.exe c:\\ISA_rmwebgis\\DrawMap.py {}".format(pk) 
        python2_env = os.environ.copy()
        python2_env.update({"PATH": "C:\\Python27\\ArcGIS10.5"})
        print('salam 2')
        run_sync = subprocess.run(replica_sync_command.split(), env=python2_env, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                             universal_newlines=True,text=True)
        if run_sync.returncode == 0:
            return Response({},status=status.HTTP_201_CREATED)  
        return  Response({},status=status.HTTP_500_INTERNAL_SERVER_ERROR)     
