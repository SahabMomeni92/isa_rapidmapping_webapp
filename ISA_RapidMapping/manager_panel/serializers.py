from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Manager_feedback,Disaster

class feedback_serializers(serializers.ModelSerializer):

    class Meta:
        model = Manager_feedback
        fields = ['status','feedback']

class Disaster_serializers(serializers.ModelSerializer):

    class Meta:
        model  = Disaster
        fields = '__all__'