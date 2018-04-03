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


class AppGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AppGroup
        fields = ('name', 'user_id', 'create_Date')


class AppTrackSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AppTrack
        fields = ('user_id', 'location', 'coordinates', 'create_Date')

class AppMsgSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AppMsg
        fields = ('sender', 'receiver', 'content', 'type', 'attachment', 'create_Date')


class AppUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AppUserProfile
        fields = ('user_id', 'icon', 'mobile_num', 'create_Date')




