from django.shortcuts import render
from django.views.generic.list import ListView
from expert_panel import models as expert_panelModels
from .models import Disaster, Manager_feedback,Approved_map
from expert_panel import models as expertPanelModels
from .serializers import Disaster_serializers, feedback_serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.conf import settings
from gdms.models import Geoserver,Workspace
from gdms.views import CreateWorkSpaceView,DeleteWorkSpaceView
import requests
from .serializers import Disaster_serializers
from django.core import serializers as SerilizersCreator
from gdms.serializers import Workspace_Serializers
import json

class Object:
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
# class manager_panelView(ListView):
#     template_name = 'manager_panel/index.html'
#     model = expert_panelModels.Expert_map
#     context_object_name = 'expert_map'

# @api_view(['POST'])
# def feedback(request):
#     form = feedback_serializers(data = request.POST)
#     Map_id = request.POST.get('map_id')
#     Map = expert_panelModels.Expert_map.objects.get(pk=Map_id)
#     # postURL = request.POST.get('postURL')
#     if form.is_valid(raise_exception=True):
#         if request.data['status'] =='B':
#             Map.status = 'B'
#             Map.save()
#         elif request.data['status'] == 'O': 
#             Map.status = 'O'
#             MapUnique_name = Map.disaster.abbreviation + 'RM' + '_' + Map.pk
#             A_Map = Approved_map(unique_name=MapUnique_name,disaster=Map.disaster,img_file=Map.img_file,
#                                     tiff_file=Map.tiff_file,title = Map.title,date = Map.date ,
#                                     event = Map.event, description = Map.description)   
#             A_Map.save() 
#             Map.save() 
#         form.save(expter_map = Map)                          
#         return Response(form.data)       
#     return Response({},status=400)
 
class DisasterView(APIView):
     
     permission_classes = [AllowAny,] 
     print('1')
     def post(self,request):
        print('2')
        
        print(request.data)
        workspace_data = {}
        workspace_data['name'] = request.data['name']
        workspace_data['system_name'] = request.data['abbreviation'] + str('_layers')
        geoserver_url = getattr(settings, "GEOSERVER_URL", None) 
        geoserver = Geoserver.objects.get(url_address = geoserver_url)   
        print('3')
        
        print(request.get_host())
        workspace_data['geoserver'] = geoserver.pk
        print(type(workspace_data))
        workspace_serializers = Workspace_Serializers(data = workspace_data)
        print(workspace_serializers)
        # try:  
        if workspace_serializers.is_valid(raise_exception=True):
                    print('4')
                    workspace_resp = geoserver.CreateWorkSpace(workspace_data['system_name'])
                    print('5')
                    print(workspace_resp)
                    if workspace_resp['status_code']==201:
                        print('r is ok')
                        workspace_serializers.save()
                        request.data['workspace'] =  Workspace.objects.get(system_name = workspace_data['system_name']).pk
                        serializers = Disaster_serializers(data = request.data)
                        if serializers.is_valid(raise_exception=True):
                            serializers.save()
                            return Response({"message":"مخاطره طبیعی با موفقیت اضافه شد"},status=status.HTTP_201_CREATED)           
        # except Exception as e:
        #     return  Response({"message":"خطای سرور",'error':e.message_dict},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     def get(self,request):
         try:
            qs = Disaster.objects.all()
            serializers = Disaster_serializers(qs,many=True)
            return Response(serializers.data,status=status.HTTP_200_OK)
         except:
            return Response({'message':'مشکل سرور'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

              
                
                
              