from djoser import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status

from .models import UserAccounts
from .permissions import managers_permissions,experts_permissions
from .serializers import PermessionsUserUpgradeSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

import requests
from djoser.email import ActivationEmail

# class UserActivationView(APIView):
#     def get (self, request, uid, token):
#         protocol = 'https://' if request.is_secure() else 'http://'
#         web_url = protocol + request.get_host()
#         post_url = web_url + "/activate/"
#         post_data = {'uid': uid, 'token': token}
#         result = requests.post(post_url, data = post_data)
#         # print(result.text)
#         content = result.text
#         return Response(content)


class WebSiteActivationEmail(ActivationEmail):
    template_name = 'emails/activation_email.html'

class UpgradeUserPermissionsView(APIView):
    permission_classes = (managers_permissions,)
    def patch(self,request,pk):        
                qs = UserAccounts.objects.get(pk=pk)
                serializer = PermessionsUserUpgradeSerializer(qs,data = request.data,partial=True)      
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data,status=status.HTTP_201_CREATED)
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                
              
