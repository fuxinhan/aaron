from django.utils.deprecation import MiddlewareMixin
from rest_framework.request import Request
from django.utils.functional import SimpleLazyObject
from django.contrib.auth.middleware import get_user
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.http import HttpResponse

def get_user_jwt(request):
    user = get_user(request)
    if user.is_authenticated:
        return user
    try:
        user_jwt = JSONWebTokenAuthentication().authenticate(Request(request))
        if user_jwt is not None:
            return user_jwt[0]
    except:
        pass
    return user


class AuthenticationMiddlewareJWT(MiddlewareMixin):
    def process_request(self, request):
        #附加的功能：添加post表单csrf免检标记(request添加属性标记即可)
        setattr(request,'_dont_enforce_csrf_checks',True)
        assert hasattr(request, 'session'), "The Django authentication middleware requires session middleware to be installed. Edit your MIDDLEWARE_CLASSES setting to insert 'django.contrib.sessions.middleware.SessionMiddleware'."
        #认证用户添加用户属性，通过token验证的用户添加user属性
        request.user = SimpleLazyObject(lambda: get_user_jwt(request))


# class MiddlewareMixin2(object):
#     def __init__(self, get_response=None):
#         self.get_response = get_response
#         super(MiddlewareMixin2, self).__init__()
#
#     def __call__(self, request):
#         response = None
#         if hasattr(self, 'process_request'):
#             response = self.process_request(request)
#         if not response:
#             response = self.get_response(request)
#         if hasattr(self, 'process_response'):
#             response = self.process_response(request, response)
#         return response


class CORSMiddleware(MiddlewareMixin):

    def process_response(self, request, response):
        # 添加响应头

        # 允许你的域名来获取我的数据
        response['Access-Control-Allow-Origin'] = "*"

        # 允许你携带Content-Type请求头
        response['Access-Control-Allow-Headers'] = "Content-Type"

        # 允许你发送DELETE,PUT
        response['Access-Control-Allow-Methods'] = "GET,DELETE,PUT,POST"

        return response
