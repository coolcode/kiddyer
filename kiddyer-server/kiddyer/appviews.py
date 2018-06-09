from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import requires_csrf_token
from django.contrib.auth.decorators import login_required
import json
from .forms import *
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth
from django.shortcuts import render_to_response
import pyrebase



# config = {
#     'apiKey': "AIzaSyBXnaPx5N8UmQueH1dZyVcrlzQG67RePLI",
#     'authDomain': "kiddyer-3752e.firebaseapp.com",
#     'databaseURL': "https://kiddyer-3752e.firebaseio.com",
#     'projectId': "kiddyer-3752e",
#     'storageBucket': "kiddyer-3752e.appspot.com",
#     'messagingSenderId': "866110809127"
#   };



config = {
        'apiKey': "AIzaSyB7tQOQDyedWRypB4e301jHgzYPBJYf9wM",
        'authDomain': "kiddyer-1521547598504.firebaseapp.com",
        'databaseURL': "https://kiddyer-1521547598504.firebaseio.com",
        'storageBucket': "",
        'messagingSenderId': "226025468668"
        };

firebase = pyrebase.initialize_app(config)

auth_firebase = firebase.auth()
db = firebase.database()





def index(request):
    context = {
    }
    return render(request, 'app/index.html', context)

def login(request):
    if request.method == 'GET':
        form = LoginForm()
        return render(request, 'app/pages-login.html', {})
    else:
        username = request.POST['username']
        password = request.POST['password']

        try:
            global user_firebase
            user_firebase = auth_firebase.sign_in_with_email_and_password(username, password)
            print(user_firebase['localId'])

            all_groups = db.child("member_group").child(user_firebase['localId']).shallow().get().val()
            list_groups = []
            print(all_groups)

            for i in all_groups:
                list_groups.append(i)

            group_name = []
            for j in list_groups:
                name = db.child("member_group").child(user_firebase['localId']).child(j).child("groupName").get().val()
                group_name.append(name)

            context = {
                'group_name': group_name
            }

        except:
            message = "invalid credentials"
            context = {
                "message": message
            }
            return render(request, 'app/pages-login.html', context)

        return render(request, 'app/member.html', context)


def logout(request):
    if request.method == "POST":
        return render(request, "app/pages-login.html", {})

def get_map_coordinate():
    all_uID = db.child("member_group").shallow().get().val()
    list_uID = []
    for i in all_uID:
        list_uID.append(i)

    u_id = str(list_uID[0])

    all_groups = db.child("member_group").child(u_id).shallow().get().val()


    list_group = []
    for i in all_groups:
        list_group.append(i)

    key = str(list_group[0])
    user_id = db.child("member_group").child(u_id).child(key).child('user').child('uid').get().val()

    lat_firebase = db.child("location").child(user_id).child('lat').get().val()
    lng_firebase = db.child("location").child(user_id).child('lng').get().val()

    context = {
        'lat_firebase': lat_firebase,
        'lng_firebase': lng_firebase
    }

    return context

@csrf_exempt
def google_map(request):

    context = {}

    return render(request, 'app/google_map.html', context)

@csrf_exempt
def home(request):
    global user_firebase
    if request.method == "POST":
        group_name = request.POST['group_name']
        print(group_name + 'home post')
        content = {
            'uid': user_firebase['localId'],
            'group_name': group_name
        }
        return render(request, 'app/index_test.html', content)
    else:
        print('home get')
        group_name = request.GET['group_name']
        content = {
            'uid': user_firebase['localId'],
            'group_name': group_name
        }
        return render(request, 'app/index_test.html', content)


def calendar(request):

    return render(request, 'app/calendar.html', {})

def member(request):
    global user_firebase

    all_groups = db.child("member_group").child(user_firebase['localId']).shallow().get().val()
    list_groups = []
    print(all_groups)

    for i in all_groups:
        list_groups.append(i)

    group_name = []
    for j in list_groups:
        name = db.child("member_group").child(user_firebase['localId']).child(j).child("groupName").get().val()
        group_name.append(name)

    context = {
        'group_name': group_name
    }

    print(user_firebase['localId'])
    return render(request, 'app/member.html', context)