from django.contrib import admin
from .models import Geoserver,Workspace

@admin.register(Geoserver)
class GeoserverAdmin(admin.ModelAdmin):
    pass
@admin.register(Workspace)
class WorkspaceAdmin(admin.ModelAdmin):
    pass
