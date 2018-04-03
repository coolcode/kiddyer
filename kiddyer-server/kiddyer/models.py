from django.db import models

# Create your models here.
class AuthGroup(models.Model):
    name = models.CharField(max_length=80, blank=True, null=True)


    def __str__(self):
        return self.name



class AuthUserGroup(models.Model):
    user_id = models.IntegerField()
    group_id = models.IntegerField()

    def __str__(self):
        return str(self.user_id)



class AuthGroupPermission(models.Model):
    group_id = models.IntegerField()
    permission_id = models.IntegerField()

    def __str__(self):
        return str(self.group_id)


class AppMsg(models.Model):
    sender = models.IntegerField()
    receiver = models.IntegerField()
    content = models.CharField(max_length=1024)
    type = models.CharField(max_length=255)
    attachment = models.CharField(max_length=1024)
    create_Date = models.DateTimeField(auto_now_add=True, auto_now=False)

    def __str__(self):
        return str(self.sender)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type_id = models.IntegerField()
    code_name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class AuthUserUserPermission(models.Model):
    user_id = models.IntegerField()
    permission_id = models.IntegerField()

    def __str__(self):
        return str(self.user_id)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(auto_now_add=False, auto_now=True)
    is_superuser = models.BooleanField()
    user_name = models.CharField(max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    def __str__(self):
        return str(self.email)

class AppUserGroup(models.Model):
    user_id = models.IntegerField()
    group_id = models.IntegerField()
    create_Date = models.DateTimeField(auto_now_add=True, auto_now=False)

    def __str__(self):
        return str(self.user_id)


class AppUserProfile(models.Model):
    user_id = models.IntegerField()
    icon = models.CharField(max_length=4096)
    mobile_num =models.CharField(max_length=20)
    create_Date = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return str(self.user_id)


class AppGroup(models.Model):
    name = models.CharField(max_length=255)
    user_id = models.IntegerField()
    create_Date = models.DateTimeField(auto_now_add=True, auto_now=False)

    def __str__(self):
        return str(self.user_id)

class AppTrack(models.Model):
    user_id = models.IntegerField()
    location = models.CharField(max_length=1024,)
    coordinates = models.CharField(max_length=255)
    create_Date = models.DateTimeField(auto_now_add=False, auto_now=True)