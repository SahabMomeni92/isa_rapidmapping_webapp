from djoser.serializers import UserCreateSerializer
from rest_framework.fields import ReadOnlyField 
from rest_framework.serializers import ModelSerializer , ValidationError
#Customize user model
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','email','password','first_name','last_name') 
        
class PermessionsUserUpgradeSerializer(ModelSerializer):
        class Meta:
            model = User
            fields = ['is_expert','is_manager','is_topmanager']
            # read_only_fields =['first_name']

        def validate(self, data): 
            if  ( 'is_manager' in data or 'is_expert' in data or 'is_topmanager' in data) == False:
                raise ValidationError({"error":"درخواست تغییر سطح دسترسی یافت نشد"})            
            return data