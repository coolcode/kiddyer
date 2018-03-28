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
        #user.save()
        return Response({'received data': request.data})


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
        return Response({'received data': request.data})



#Family Group
#url api/v1/group/
class APICreateFamilyView(APIView):

    def put(self, request, format=None):
        groupName = request.data['groupName']
        userId = request.data['userId']
        group = AppGroup.objects.get_or_create(name=groupName, user_id=userId)
        return Response({'received data': request.data})

    def post(self, request, format=None):
        groupName = request.data['groupName']
        userId = request.data['userId']
        AppGroup.objects.filter(user_id=userId).update(name=groupName)
        return Response({'received data': request.data})

#url api/v1/group/{id}
class APIDeleteFamilyGroupView(APIView):

    def delete(self, request, pk, format=None):
       # print("username: %s" % (pk))
        group = AppGroup.objects.filter(user_id=pk).delete()


        return Response(status=status.HTTP_204_NO_CONTENT)

# url api/v1/user_group/
class APIShowFamilyGroupView(APIView):

    def get(self, request, *args, **kwargs):
        group_list = AppGroup.objects.all()
        serializer_class = ShowFamilyGroupSerializer(instance=group_list, many=True)

        return Response({'received data': serializer_class.data})
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
        return Response({'received data': request.data})



#Location Tracking
#url api/v1/tracking/
class APITrackLocationView(APIView):

    def post(self, request, format=None):
        userName = request.data['userName']
        time = request.data['time']

        obj = AppTrack.objects.filter(user_name=userName, create_Date=time).get()

        return Response({'received data': request.data})


class APIQueryLastLocation(APIView):

    def get(self, request, format=None):
        userName = request.data['userName']
       # time = request.data['time']

        obj = AppTrack.objects.filter(user_name=userName).latest('create_Date')
        return Response({'received data': request.data})
