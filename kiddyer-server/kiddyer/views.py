from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login
from rest_framework import viewsets
from .serializers import *
from .models import *

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


# class AuthenticationViewSet(viewsets.ModelViewSet):
#     queryset = AuthUser.objects.all()
#     serializer_class = AuthenticationSerializer


#Authentition
# url api/v1/user/register/
class APIRegisterView(APIView):

   # parser_classes = (JSONParser,)

    def post(self, request, format=None):
        userName = request.data["userName"]
        password = request.data['password']
        email = request.data['email']
       # print("username: %s" %(userName))
       # print("password: %s" %(password))

        user = User.objects.create_user(userName, email, password)
        return Response({'result data': request.data})


#url api/v1/user/login/
class APILoginView(APIView):

    # def get(self, request, format=None):
    #     return Response({'yyy': "Hello world"})

    def post(self, request, format=None):
        userName = request.data["userName"]
        password = request.data['password']
        user = authenticate(username=userName, password=password)
        if user is not None:
            #if user.is_active:
            return Response({'result': True})
        else:
            return Response({'result': False})


#url api/v1/user/logout/
class APILogoutView(APIView):

    def post(self, request, format=None):
        return Response({'result data': request.data})



#Family Group
#url api/v1/group/
class APICreateFamilyView(APIView):
    #create family group
    def put(self, request, format=None):
        groupName = request.data['groupName']
        userId = request.data['userId']
        obj, created = AppGroup.objects.get_or_create(name=groupName, user_id=userId)
        if created:
            return Response("Family Create Successfully")
        else:
            return Response("Family Create Failed")

    #update family group
    def post(self, request, format=None):
        groupName = request.data['groupName']
        userId = request.data['userId']
        updated = AppGroup.objects.filter(user_id=userId).update(name=groupName)

        if updated:
            return Response("Update Successfully")
        else:
            return Response("Update Failed")

#url api/v1/group/{id}
class APIDeleteFamilyGroupView(APIView):

    def delete(self, request, pk, format=None):
       # print("username: %s" % (pk))
        deleted, rows_count = AppGroup.objects.filter(user_id=pk).delete()
        if deleted:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# url api/v1/user_group/
class APIShowFamilyGroupView(APIView):

    def get(self, request, *args, **kwargs):
        group_list = AppGroup.objects.all()
        serializer_class = AppGroupSerializer(instance=group_list, many=True)

        return Response({'result data': serializer_class.data})
# def showFamilyGroup(request):
#     if request.method =='GET':
#         group_list = AppGroup.objects.all()
#         serializer_class = ShowFamilyGroupSerializer(group_list, many=True)
#         content = JSONRenderer().render(serializer_class.data)
#         print(content)
#         # return JsonResponse(serializer_class.data, safe=False)
#         return JsonResponse(serializer_class.data, safe=False)


#url api/v1/user_group/{id}/
class APIQuitFamilyGroupView(APIView):

    def post(self, request, format=None):
        return Response({'result data': request.data})



#Location Tracking API
#url api/v1/tracking/
class APITrackLocationView(APIView):

    def post(self, request, format=None):
        userId = request.data['userId']
        location = request.data['location']
        coordinates = request.data['coordinates']
        time = request.data['time']
        obj, created = AppTrack.objects.get_or_create(user_id=userId, location=location, coordinates=coordinates, create_Date=time)

        if created:
            return Response("Track Location Successfully")
        else:
            return Response("Track Location Failed")

#url api/v1/last_location/
class APIQueryLastLocationView(APIView):

    def get(self, request, format=None):
        userId = request.query_params.get('userId')
        obj = AppTrack.objects.filter(user_id=userId).latest('create_Date')
        serializer_class = AppTrackSerializer(instance=obj, many=True)

        return Response({'result data': serializer_class.data})


#url api/v1/tracking_history/
class APIQueryLocationHistoryView(APIView):

    def get(self, request, format=None):
        userId = request.query_params.get('userId')
        obj_list = AppTrack.objects.filter(user_id=userId).all()
        serializer_class = AppTrackSerializer(instance=obj_list, many=True)

        return Response({'result data': serializer_class.data})


#Chat API
#url api/v1/msg/
class APISendMessageView(APIView):

    def post(self, request, format=None):
        sender = request.data['sender']
        obj = AppMsg.objects.get(sender=sender)
        serializer_class = AppMsgSerializer(instance=obj)

        return Response({'result data': serializer_class.data})



#User Profile API
#url api/v1/user_profile/

class APIUpdateUserProfileView(APIView):

    def post(self, request, format=None):
        userId = request.data['userId']
        userId_Int = int(userId)
        icon = request.data['icon']
        mobileNum = request.data['mobileNo']
        date = request.data['date']

        obj = AppUserProfile.objects.filter(user_id=userId_Int).update(icon=icon, mobile_num=mobileNum, create_Date= date)

        serializer_class = AppUserProfileSerializer(instance=obj)

        return Response({'result data': "Success"})

    # def get(self, request, format=None):
    #     userId = request.query_params.get('userId')
    #     obj = AppUserProfile.objects.filter(user_id=userId).get()
    #     serializer_class = AppUserProfileSerializer(instance=obj)
    #
    #     return Response({'result data': serializer_class.data})

#url api/v1/user_profile/{user_id}
class APIGetUserProfileView(APIView):

    def get(self, request, pk, format=None):
        obj = AppUserProfile.objects.filter(user_id=pk).get()
        serializer_class = AppUserProfileSerializer(instance=obj)

        return Response({'result data': serializer_class.data})


