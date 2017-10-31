from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import requires_csrf_token
from django.contrib.auth.decorators import login_required
import json

def index(request):

    context = {
    }
    return render(request, 'app/index.html', context)

