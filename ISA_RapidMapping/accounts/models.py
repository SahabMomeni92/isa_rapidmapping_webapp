from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserAccountManager(BaseUserManager):
    def create_user(self,email,first_name,last_name,is_expert,is_manager,password=None):
        if not email:
            raise ValueError('لطفاً یک آدرس ایمیل معتبر وارد کنید')
        email = self.normalize_email(email)  
        user = self.model(email=email,first_name = first_name,last_name=last_name,is_expert=is_expert,is_manager=is_manager)
        user.set_password(password)
        user.save()

        return user  
    # def create_expert(self,email,first_name,last_name,password=None):
    #     user = self.create_user(email,first_name,last_name,password)
    #     user.is_expert = True
    #     user.save()
    #     return user

    # def create_manager(self,email,first_name,last_name,password=None):
    #     user = self.create_user(email,first_name,last_name,password)
    #     user.is_expert = True
    #     user.is_manager = True
    #     user.save()
    #     return user

    def create_topmanager(self,email,first_name,last_name,password=None):
        user = self.create_user(email,first_name,last_name,password)
        user.is_expert = True
        user.is_topmanager = True
        user.save()
        return user  

    def create_superuser(self,email,first_name,last_name,password=None,is_expert=True,is_manager=True):
        user = self.create_user(email,first_name,last_name,is_expert,is_manager,password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user        



class UserAccounts(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField( unique=True, max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True,blank=True)
    is_expert = models.BooleanField(default=False,blank=True)
    is_manager = models.BooleanField(default=False,blank=True)
    is_topmanager = models.BooleanField(default=False,blank=True)
    is_superuser = models.BooleanField(default=False,blank=True)
    is_staff = models.BooleanField(default=False,blank=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name','is_expert','is_manager']

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def __str__(self):
        return self.email
      