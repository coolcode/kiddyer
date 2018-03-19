from django.contrib import admin

# Register your models here.
from kiddyer import models

class AuthGroupAdmin(admin.ModelAdmin):
    list_display = ["id", "__str__"]

    class Meta:
        model = models.AuthGroup


class AuthUserGroupAdmin(admin.ModelAdmin):
    list_display = ["user_id", "group_id"]

    class Meta:
        model = models.AuthUserGroup

class AuthGroupPermissionAdmin(admin.ModelAdmin):
    list_display = ["group_id", "permission_id"]

    class Meta:
        model = models.AuthGroupPermission


class AppMsgAdmin(admin.ModelAdmin):
    list_display = ["sender", "receiver", "content", "type", "attachment", "create_Date"]

    class Meta:
        model = models.AppMsg


class AuthPermissionAdmin(admin.ModelAdmin):
    list_display = ["name", "content_type_id", "code_name"]

    class Meta:
        model = models.AuthPermission

class AuthUserUserPermissionAdmin(admin.ModelAdmin):
    list_display = ["user_id", "permission_id"]

    class Meta:
        model = models.AuthUserUserPermission


class AuthUserAdmin(admin.ModelAdmin):
    list_display = ["email", "password", "user_name", "first_name", "last_name", "last_login", "is_superuser", "is_staff", "is_active", "date_joined"]

    class Meta:
        model = models.AuthUser



class AppUserGroupAdmin(admin.ModelAdmin):
    list_display = ["user_id", "group_id", "create_Date"]

    class Meta:
        model = models.AppUserGroup



class AppUserProfileAdmin(admin.ModelAdmin):
    list_display = ["user_id", "icon", "mobile_num", "create_Date"]

    class Meta:
        model = models.AppUserProfile




class AppGroupAdmin(admin.ModelAdmin):
    list_display = ["name", "user_id", "create_Date"]

    class Meta:
        model = models.AppGroup




admin.site.register(models.AuthGroup, AuthGroupAdmin)
admin.site.register(models.AuthUserGroup, AuthUserGroupAdmin)
admin.site.register(models.AuthGroupPermission, AuthGroupPermissionAdmin)
admin.site.register(models.AppMsg, AppMsgAdmin)
admin.site.register(models.AuthPermission, AuthPermissionAdmin)
admin.site.register(models.AuthUserUserPermission, AuthUserUserPermissionAdmin)
admin.site.register(models.AuthUser, AuthUserAdmin)
admin.site.register(models.AppUserGroup, AppUserGroupAdmin)
admin.site.register(models.AppUserProfile, AppUserProfileAdmin)
admin.site.register(models.AppGroup, AppGroupAdmin)