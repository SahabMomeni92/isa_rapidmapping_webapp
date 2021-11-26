from django.urls import path

import accounts.views as accountsView
import gdms.views as gdmsView
import expert_panel.views as expertView
import manager_panel.views as managerView
# from accounts.views import UserActivationView
urlpatterns = [
    path('accounts/upgradeuserpermissions/<int:pk>/', accountsView.UpgradeUserPermissionsView.as_view()),
    path('gdms/createworkspace/', gdmsView.CreateWorkSpaceView.as_view()),
    path('gdms/deleteworkspace/<int:pk>/', gdmsView.DeleteWorkSpaceView.as_view()), 
    path('gdms/creategeospatialfiles/', gdmsView.CreateGeoSpatialFile.as_view()), 
    path('expert_panel/createexpertmap/',expertView.CreateExpertMap.as_view()),
    path('manager_panel/createdisaster/',managerView.DisasterView.as_view()),
    path('expert_panel/expertmap/',expertView.ExpertMap_List.as_view()),
    path('expert_panel/expertmap/<int:pk>/',expertView.ExpertMap_Detail.as_view()),

]