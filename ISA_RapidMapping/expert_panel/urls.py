from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # # path('/',views.ExpertMapCreateView,name='expet_panel'),
    # path('/',views.ExpertMapCreateView.as_view(),name='expert_panel'),
    # path('/expert_map/<int:pk>',views.ExpertMapDetailView.as_view(),name='expertmap_detail'),
    # path('/expert_map/<int:pk>/delete',views.expertMapDeleteView.as_view(),name='expertmap_delete'),
    # path('/profile',views.profileView.as_view(),name='expert_profile')
]
