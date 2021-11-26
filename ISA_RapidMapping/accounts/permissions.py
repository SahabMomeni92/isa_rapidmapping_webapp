from rest_framework import permissions 

class experts_permissions(permissions.BasePermission):

    # edit_methods = ("PUT", "PATCH")

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):

        if request.user.is_superuser or request.user.is_expert or request.user.is_manager or request.user.is_is_topmanager:

            return True

        return False

class managers_permissions(permissions.BasePermission):

    # edit_methods = ("PUT", "PATCH")

    def has_permission(self, request, view):
         if request.user.is_authenticated and (request.user.is_superuser or request.user.is_manager):
            
             return True

         return False    
  