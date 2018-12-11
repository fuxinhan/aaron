from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page

from base import views as base_views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls

import xadmin
from rest_framework_swagger.views import get_swagger_view
from users.views import  UserViewSet #SmsCodeViewSet,
from users.views import *
# from Resources.test import img_test
from django.contrib import admin
schema_view = get_swagger_view(title='Pastebin API')

router = DefaultRouter()
# router.register(r'smscodes', SmsCodeViewSet, base_name="smscodes")
router.register(r'', UserViewSet)
urlpatterns = [
    # url('admin/', admin.site.urls),
    # url(r'test',img_test),
    url(r'^UserHandler/Users/$', include(router.urls), name="api"), # list
    url(r'^UserHandler/Users/(?P<pk>.*?)/$', UserDetail.as_view()),  # user 

    url(r'^UserHandler/Tokens/', obtain_jwt_token),  # toker
    url(r'^UserHandler/SmsCodes/(?P<pk>.*?)/$', SmsCode.as_view()),  # code

    url(r'^Resources/', include('Resources.urls')),  

    # url(r'docs/', include_docs_urls(title="文档功能")),
    # url(r'^docs-test/', schema_view, name="文档接口测试"),
    # url(r'^xadmin/', xadmin.site.urls),
    url(r'^', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
    # url(r'users/$',UserList.as_view()),
    # url(r'mycourses/',MyCourses.as_view()),
    # url(r'users/(?P<pk>.*?)/$', test),

]


