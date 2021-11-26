from django.db import models
from django.urls import reverse
from gdms.models import GeospatialFile
from django.contrib.auth import get_user_model
User = get_user_model()

class Expert_map(models.Model):

    disaster = models.ForeignKey(to='manager_panel.Disaster',on_delete=models.CASCADE,verbose_name='نام مخاطره')
    #disaster = models.CharField(max_length=50,verbose_name='نام مخاطره')
    img_file = models.FileField(upload_to='images/expert/map_files',verbose_name='فایل نقشه')
    tiff_file = models.ForeignKey(GeospatialFile, on_delete=models.SET_NULL,null=True)
    title = models.CharField(max_length=300,verbose_name='عنوان نقشه')   
    expert = models.ForeignKey(User,on_delete=models.SET_NULL,blank=True,null=True)
    author = models.CharField(max_length=300,verbose_name='نام نویسنده')
    date = models.DateField(verbose_name='تاریخ حادثه')
    pub_date = models.DateField(auto_now_add=True)
#     status_choice = [('P', 'در حال بررسی'),('B', 'نیاز به اصلاحات دارد'),('O','تایید شده است')]
#     map_status = models.CharField(max_length=1,choices=status_choice,verbose_name='وضعیت', default='P')
#     event = models.ForeignKey(to='manager_panel.Event',on_delete=models.SET_NULL,null=True , blank= True ,help_text='آیا این نقشه زیر مجموعه یک رخداد است؟')
    description = models.TextField(help_text='توضیحات نقشه', blank=True,null=True,verbose_name='توضیحات')

    # class Meta:
    #     verbose_name = _("")
    #     verbose_name_plural = _("s")

    def __str__(self):
         return self.title

    def get_absolute_url(self):
         return reverse("expertmap_detail", kwargs={"pk": self.pk})

    
