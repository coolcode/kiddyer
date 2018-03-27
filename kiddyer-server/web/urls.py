"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from kiddyer import views, appviews

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
# router.register(r'authentication',views.AuthenticationViewSet)
#router.register(r'login',views.login.as_view(), base_name='login')


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^', include(router.urls)),
    url(r'^api/', include(router.urls)),
    #api
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #app
    # url(r'^', appviews.index, name="index"),
    # api/v1/user/register/
    url(r'^api/v1/user/register/$', views.APIRegisterView.as_view(), name='api-v1-user-register'),

    #api/v1/user/login/
    url(r'^api/v1/user/login/$', views.APILoginView.as_view(), name="api-v1-user-login"),

    #api/v1/user/logout/
    url(r'^api/v1/user/logout/$', views.APILogoutView.as_view(), name='api-v1-user-logout'),

    #api/v1/group/
    url(r'^api/v1/group/$', views.APICreateFamilyView.as_view(), name='api-v1-group'),

    #api/v1/group/{id}
    url(r'^api/v1/group/(?P<pk>[0-9]+)/$', views.APIDeleteFamilyGroupView.as_view(), name='api-v1-group-id'),

    #api/v1/group/{id}
    url(r'^api/v1/user_group/$', views.APIShowFamilyGroupView.as_view(), name='api-v1-usergroup'),
]



#urlpatterns = format_suffix_patterns(urlpatterns)