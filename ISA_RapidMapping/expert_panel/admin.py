from django.contrib import admin
from .models import Expert_map

@admin.register(Expert_map)
class Expert_mapAdmin(admin.ModelAdmin):
    pass
