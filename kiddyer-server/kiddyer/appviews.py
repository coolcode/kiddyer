from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import requires_csrf_token
from django.contrib.auth.decorators import login_required
import json
from .forms import *
from django.contrib import auth

def index(request):

    context = {
    }
    return render(request, 'app/index.html', context)

def login(request):
    if request.method == 'GET':
        form = LoginForm()
        return render(request, 'app/login_test.html', {})
    else:
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = auth.authenticate(username=username, password=password)

            if user is not None and user.is_active:
                auth.login(request, user)
                return render(request, 'app/index_test.html', {})
            else:
                return render(request, 'app/login_test.html', {})
        else:
            # msg = 'Errors: %s' % form.errors.as_text()
            # return HttpResponse(msg, status=400)
            # return HttpResponse(form.errors)
            return render(request, "app/login_test.html", {})