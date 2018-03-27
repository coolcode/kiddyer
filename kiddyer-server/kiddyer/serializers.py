from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')



# class AuthenticationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AuthUser
#         fields = ('user_name', 'user_name', 'password', 'last_login', 'is_superuser')