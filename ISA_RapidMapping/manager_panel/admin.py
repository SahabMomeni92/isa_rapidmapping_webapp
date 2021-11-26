from django.contrib import admin

from .models import Disaster

@admin.register(Disaster)
class DisasterAdmin(admin.ModelAdmin):
    pass
