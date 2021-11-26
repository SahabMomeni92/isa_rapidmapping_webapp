from django.db import models
from django.db.models.deletion import SET_DEFAULT, SET_NULL
from gdms.models import Workspace
class Disaster(models.Model):

    name = models.CharField(max_length=50,verbose_name='نام فارسی')
    workspace = models.CharField(max_length=50,verbose_name='نام انگلیسی')
    abbreviation = models.CharField(max_length=50,verbose_name='نام مخفف',unique=True)
    # maps_count = models.IntegerField(default=0 , null=True , blank= True , verbose_name='تعداد کل نقشه ها در پایگاه داده')
    # events_count = models.IntegerField(default=0 , null=True , blank= True , verbose_name='تعداد کل رخدادها در پایگاه داده')
    
    # class Meta:
    #     verbose_name = _("disasters")
    #     verbose_name_plural = _("disasterss")

    def __str__(self):
         return self.fa_name

    # def get_absolute_url(self):
    #     return reverse("disasters_detail", kwargs={"pk": self.pk})

class Event(models.Model):

    title = models.CharField(max_length=100,verbose_name='عنوان رخداد')
    disater = models.ForeignKey(Disaster,on_delete=models.CASCADE)
    start_date = models.DateField(verbose_name='تاریخ شروع')
    end_date = models.DateField(verbose_name='تاریخ پایان',blank=True,null=True)
    is_active = models.BooleanField(default=True)
    workspace = models.ForeignKey(Workspace,on_delete=SET_DEFAULT,default=17)
    description = models.TextField(help_text='معرفی رخداد', blank=True,null=True,verbose_name='توضیحات')

    # class Meta:
    #     verbose_name = _("Event")
    #     verbose_name_plural = _("Events")

    def __str__(self):
         return self.title

    # def get_absolute_url(self):
    #     return reverse("Event_detail", kwargs={"pk": self.pk})

class Approved_map(models.Model):

    unique_name = models.CharField(max_length=50,default='uname') #unique=True
    expert = models.CharField(max_length=100,default='sahab momeni',verbose_name='نام کارشناسان')
    manager = models.CharField(max_length=100,default='younes dehghan',verbose_name='نام مدیر تایید کننده')
    disaster = models.ForeignKey(Disaster,on_delete=models.CASCADE,verbose_name='نام مخاطره')
    img_file = models.FileField(upload_to='images/system/map_files',verbose_name='فایل نقشه')
    tiff_file = models.FileField(upload_to='geospatial_files/system/tiff_files',verbose_name='فایل نقشه')
    title = models.CharField(max_length=300,verbose_name='عنوان نقشه') 
    date = models.DateField(verbose_name='تاریخ حادثه')
    pub_date = models.DateField(auto_now_add=True)
    event = models.ForeignKey(Event,on_delete=models.CASCADE,null=True , blank= True ,help_text='آیا این نقشه زیر مجموعه یک رخداد است؟')
    description = models.TextField(help_text='توضیحات نقشه', blank=True,null=True,verbose_name='توضیحات')
    # class Meta:
    #     verbose_name = _("Approved_map")
    #     verbose_name_plural = _("Approved_maps")

    def __str__(self):
         return self.title

    # def get_absolute_url(self):
    #     return reverse("Approved_map_detail", kwargs={"pk": self.pk})

class Manager_feedback(models.Model):

    expter_map = models.ForeignKey(to='expert_panel.Expert_map',on_delete=models.CASCADE)
    status_choice = [('R', 'رد شدن'),('B', 'نیاز به اصلاحات دارد'),('O','تایید شده')]
    status = models.CharField(max_length=1,verbose_name='وضعیت',choices=status_choice)
    expert = models.CharField(max_length=100,default='sahab momeni',verbose_name='نام کارشناسان')
    manager = models.CharField(max_length=100,default='younes dehghan',verbose_name='نام مدیر ')
    pub_date = models.DateField(auto_now_add=True,verbose_name='تاریخ بررسی')
    feedback = models.TextField(help_text='توضیحات ',blank=True,null=True,verbose_name='توضیحات')

    # class Meta:
    #     verbose_name = _("Manager_feedback")
    #     verbose_name_plural = _("Manager_feedbacks")

    # def __str__(self):
    #     return self.name

    # def get_absolute_url(self):
    #     return reverse("Manager_feedback_detail", kwargs={"pk": self.pk})
