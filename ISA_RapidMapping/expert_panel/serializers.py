from rest_framework import serializers
from .models import Expert_map,Draw_map
from django import forms

class ExpertMapSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Expert_map  
        # date = serializers.DateTimeField
        fields = '__all__'

class DrawMapSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Draw_map  
        # date = serializers.DateTimeField
        fields = '__all__'        