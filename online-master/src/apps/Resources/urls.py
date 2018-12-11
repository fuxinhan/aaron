from django.conf.urls import url
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns
# from .test import img_test

urlpatterns=[
    #通用接口
    url(r'^(?P<model_str>[A-Za-z0-9_]*?)/$', Resources.as_view()),
    url(r'^(?P<model_str>[A-Za-z0-9_]*?)/(?P<pk>[0-9]+)/$', ResourcesDetail.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)






