from rest_framework import serializers
from .models import Workspace,GeospatialFile

# class GeoServer_Serializers(serializers.ModelSerializer):
    
#     class Meta:
#         model = gdms_models.Geoserver  
#         # date = serializers.DateTimeField

class Workspace_Serializers(serializers.ModelSerializer):
    
    class Meta:
        model = Workspace
        fields ='__all__'

class GeospatialFile_Serializers(serializers.ModelSerializer):
    
    class Meta:
        model = GeospatialFile
        fields ='__all__'        
# class GeoServer_Serializers(serializers.ModelSerializer):
    
#     class Meta:
#         model = gdms_models.Geoserver  
#         # date = serializers.DateTimeField

