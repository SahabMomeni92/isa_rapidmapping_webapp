from django.contrib.gis.db import models
from django.urls import reverse
from django.conf import settings
from django.http import JsonResponse
from rest_framework.serializers import ValidationError
from rest_framework.response import Response
from rest_framework import status
import requests
import os
from .supports import prepare_zip_file
from geo.Geoserver import Geoserver as Geoserver_rest
#########

geoserver_url = getattr(settings, "GEOSERVER_URL", None)

class Geoserver(models.Model):

    # name = models.CharField(max_length=30,verbose_name="نام",unique=True)
    url_address = models.CharField(max_length=300,verbose_name="آدرس دامنه",default=geoserver_url)
    user_name = models.CharField(max_length=30,verbose_name="نام کاربری",default='admin')
    password = models.CharField(max_length=30,verbose_name="گذرواژه",default='geoserver')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     verbose_name = _("Geoserver")
    #     verbose_name_plural = _("Geoservers")

    def __str__(self):
        return self.url_address

    def get_absolute_url(self):
        return reverse("Geoserver_detail", kwargs={"pk": self.pk})

    def CreateWorkSpace(self,WorkSpaceName):
        try:
            url = "{}rest/workspaces".format(self.url_address)
            data = "<workspace><name>{}</name></workspace>".format(WorkSpaceName)
            headers = {"Content-type": "application/xml"}
            
            r = requests.post(
                url, data=data, auth=(self.user_name, self.password), headers=headers
            )
            print(r.status_code)
            if r.status_code == 201:
                return {
                    "message":"فضای کاری {} ایجاد شد".format(WorkSpaceName),
                    "status_code":201
                }

            if r.status_code in [401,409]:
                return {
                    "message":"این نام موجود است لطفاً یک نام دیگر انتخاب کنید".format(WorkSpaceName),
                    "status_code":401
                }
            else:
                # raise Exception(data)
                raise Exception("به نظر می رسد یک مشکل در اتصال به سرور مکانی وجود دارد")

        except Exception as e:
            return {
                "message":"خطای سرور",
                "error":str(e),
                'status_code':500
                }
    def DeleteWorkSpace(self,WorkSpaceName):  
        try:
            payload = {"recurse": "true"}
            url = "{}rest/workspaces/{}/".format(geoserver_url, WorkSpaceName)
            r = requests.delete(url, auth=(self.user_name, self.password), params=payload)

            if r.status_code == 200:
                return Response({
                    "message":"فضای کاری {} پاک شد".format(WorkSpaceName),
                },status= status.HTTP_200_OK)

            else:
                raise Exception("Error: {} {}".format(r.status_code, r.content))

        except Exception as e:
           return Response({
                "message":"خطای سرور",
                "error":str(e)
                },status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    

class Workspace(models.Model):

    name = models.CharField(max_length=100,verbose_name="نام",unique=True)
    system_name = models.CharField(max_length=100,verbose_name="نام سیستمی",unique=True)
    geoserver = models.ForeignKey(Geoserver , on_delete=models.CASCADE , verbose_name="سرور نقشه")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def create_coveragestore(self,file,layer_name,file_type="GeoTIFF"):
 
        file_type = file_type.lower()

        url = '{0}rest/workspaces/{1}/coveragestores/{2}/file.{3}?coverageName={2}'.format(
            self.geoserver.url_address, self.system_name, layer_name, file_type)

        headers = {
            "content-type":"image/tiff"
        }
        try:
            r = requests.put(url, data=file, auth=(self.geoserver.user_name, self.geoserver.password)
            , headers=headers)

            if r.status_code in [201,200]:
                return {
                    "message": "فایل رستر به درستی وارد سرور مکانی شد",
                    "status_code":r.status_code,
                    "content":r.content
                    }
            else:
                    raise Exception(
                        "{}:  {}".format(
                        r.status_code, r.content
                        )
                    )
        except Exception as e:
            return {
                "message":"خطای سرور",
                "error":str(e),
                "status_code":500
                }
    
    def Create_SHP_DataStore(self,file,store_name):
        try:
            
            if store_name is None:
                store_name = os.path.basename(file)
                f = store_name.split(".")
                if len(f) > 0:
                    store_name = f[0]

            headers = {
                "Content-type": "application/zip",
                "Accept": "application/xml",
            }
            # if not is_ziped:
            #     path = prepare_zip_file(store_name, path)

            url = "{0}rest/workspaces/{1}/datastores/{2}/file.shp?filename={2}&update=overwrite".format(
                self.geoserver.url_address, self.system_name, store_name
            )
            
            
            r = requests.put(
                    url,
                    data=file,
                    auth=(self.geoserver.user_name, self.geoserver.password),
                    headers=headers,
                )
            # print(r)
            if r.status_code in [200, 201]:
                    return {
                    "message": "فایل به درستی وارد سرور مکانی شد",
                    "content":r.content,
                    "status_code":r.status_code,
                    }
            else:
                    raise Exception(
                        "{}:  {}".format(
                        r.status_code, r.content
                        )
                    )
                    

        except Exception as e:
            return {
                "message":"خطای سرور",
                "error":str(e),
                "status_code":500
                }
    
    # def CreateStyle(self ,sld_file_path , StyleName):
    #     url_address = self.geoserver.url_address + "/rest/workspaces/" + self.system_name + "/styles"
    #     # print(PostRequest)
    #     #file = open(r'' + str(sld_file_path) , 'rb')
    #     headers = {'Content-type':'application/zip'}
    #     response =  requests.post(url_address , auth = (self.geoserver.user_name,self.geoserver.password)
    #      , data = sld_file_path , headers = headers)
    #     # print(response.status_code)
    #     # print(response.text)
    #     if response.status_code == 201:
    #         return True
    #     # print(response.text)

    # def DeleteStyle(self, StyleName):
    #     delete_style_url = self.geoserver.url_address + "/rest/workspaces/" + self.name + "/styles/" + StyleName
    #     print("deleting workspace url: " + delete_style_url)
    #     headers = {'Content-type':'application/json'}
    #     response =  requests.delete(delete_style_url , auth = (self.user_name,self.password) , headers = headers)
    #     print(response.status_code)
    #     return response

    # class Meta:
    #     verbose_name = _("Workspace")
    #     verbose_name_plural = _("Workspaces")

    def __str__(self):
         return self.name

    def get_absolute_url(self):
        return reverse("Workspace_detail", kwargs={"pk": self.pk})

class Style(models.Model):

    name = models.CharField(max_length=100,verbose_name="نام")
    system_name = models.CharField(max_length=100,verbose_name="نام سیستمی",unique=True)
    description = models.TextField(help_text='توضیحات استایل', 
        blank=True,verbose_name='توضیحات')
    workspace = models.ForeignKey(Workspace , on_delete=models.CASCADE , verbose_name="فضای کار")
    file_path = models.FileField(upload_to='geospatialFile/Styles/',verbose_name="فایل",blank=True)

    # class Meta:
    #     verbose_name = _("Style")
    #     verbose_name_plural = _("Styles")

    def __str__(self):
         return self.name

    def get_absolute_url(self):
        return reverse("Style_detail", kwargs={"pk": self.pk})

    def UploadSLD_Style(self):
        geoserver_rest = Geoserver_rest(self.workspace.geoserver.url_address,
         username=self.workspace.geoserver.user_name, password=self.workspace.geoserver.password)
        geoserver_rest.upload_style(path=self.file_path, workspace=self.workspace.system_name)
        return geoserver_rest
    def CreateCoverage_Style(self,raster_path,colorRamp):  
        geoserver_rest = Geoserver_rest(self.workspace.geoserver.url_address,
         username=self.workspace.geoserver.user_name, password=self.workspace.geoserver.password)
        geoserver_rest.create_coveragestyle(raster_path=raster_path, style_name=self.system_name,
         workspace=self.workspace.system_name
        , color_ramp=colorRamp)
        return geoserver_rest
    def CreateCoverage_Style(self,raster_path,colorRamp,isClassified):  
        geoserver_rest = Geoserver_rest(self.workspace.geoserver.url_address,
         username=self.workspace.geoserver.user_name, password=self.workspace.geoserver.password)
        if isClassified:
            geoserver_rest.create_coveragestyle(raster_path=raster_path, style_name=self.system_name,
             workspace=self.system_name, color_ramp=colorRamp,cmap_type='values')
        else:
            geoserver_rest.create_coveragestyle(raster_path=raster_path, style_name=self.system_name,
             workspace=self.system_name , color_ramp=colorRamp)    
        return geoserver_rest    
    def publish_style(self,LayerName,sldVersion='1.0.0'):    
        geoserver_rest = Geoserver_rest(self.workspace.geoserver.url_address,
         username=self.workspace.geoserver.user_name, password=self.workspace.geoserver.password)
        geoserver_rest.publish_style(layer_name=LayerName, style_name=self.system_name
        , workspace=self.workspace.system_name, sld_version=sldVersion)
        return geoserver_rest
    def Delete_Style(self):
        geoserver_rest = Geoserver_rest(self.workspace.geoserver.url_address,
         username=self.workspace.geoserver.user_name, password=self.workspace.geoserver.password)
        geoserver_rest.delete_style(self.system_name, workspace=self.workspace.system_name)
        return geoserver_rest

class GeospatialFile(models.Model):
    name = models.CharField(max_length=100,verbose_name="نام فایل",unique=True)
    system_name = models.CharField(max_length=100,verbose_name="نام سیستمی",unique=True)
    # fa_name = models.CharField(max_length=30,verbose_name="نام فارسی", blank=True,unique=True)
    file = models.FileField(upload_to='geospatialFile/geospatials/',verbose_name="فایل")
    file_type = models.CharField(max_length=10)
    description = models.CharField(max_length=255,verbose_name="توضیحات", blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    # geoserver = models.ForeignKey(Geoserver,on_delete=models.CASCADE,verbose_name='سرور مکانی')
    workspace = models.ForeignKey(Workspace,on_delete=models.CASCADE,verbose_name='محیط کاری در سرور')
    style = models.ForeignKey(Style,on_delete=models.SET_NULL,verbose_name='استایل',blank=True,null=True)
    class Meta:
         verbose_name = "فایل مکانی"
        #  verbose_name_plural = _("s")

    # def __str__(self):
    #     return self.name
    
    def get_absolute_url(self):
        return reverse("GeospatialFile_detail", kwargs={"pk": self.pk})
    def __str__(self):
        return self.name




    

