from .models import *
from .serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .tools import InitAuthorities,test


#响应工厂
class ResponseFactory:

    def __new__(cls,data,**kwargs):
        if type(data)==str:
            return HttpResponse(data,**kwargs)
        else:
            return Response(data,**kwargs)

#扩展的基类
class APIViewProfile(APIView):
    def dispatch(self, request, *args, **kwargs):
        from .permissions import PermissionFactory
        permission=PermissionFactory(request, *args, **kwargs)
        request.permission=permission
        return super().dispatch(request, *args, **kwargs)

    def permission_Testing(self,request, model_str,pk):
        permission=request.permission
        # print(permission)
        model_obj, serializer_calss = self.get_objs(model_str)
        if permission.status:
            data = dict(request.data)
            for i in data:
                if type(data[i]) == list:
                    data[i] = data[i][0]
            if not pk:
                if request.method=='GET':
                    result_obj = model_obj.objects.all()
                    serializer = serializer_calss(result_obj, many=True)
                elif request.method=='POST':
                    serializer=serializer_calss(data=data)
                else:
                    serializer=None
            else:
                result_obj = model_obj.objects.filter(pk=pk).first()
                if not result_obj:
                    return self.Error('访问的资源不存在')
                if request.method == 'GET':
                    serializer=serializer_calss(result_obj)
                elif request.method == 'PUT':
                    serializer=serializer_calss(result_obj,data=data,partial=True)
                else:
                    serializer=None
        else:
            serializer=permission.result(model_str,request)
        return serializer

    def get_objs(self,model_str,pk=None):
        model_obj=eval(model_str)
        serializer_calss=eval(model_str+'Serializer')
        if not pk:
            return model_obj, serializer_calss
        else:
            try:
                model_detail=model_obj.objects.get(pk=pk)
                return model_obj, serializer_calss,model_detail
            except model_obj.DoesNotExist:
                raise Http404
    class Error:
        def __init__(self,info='未知错误,请检查参数是否正确'):
            self.data={'error':info}
        def is_valid(self):
            return True
        def save(self):
            pass

#GET_LIST,POST_ONE
class Resources(APIViewProfile):

    def get(self, request, model_str,pk=None,format=None):
        # test()
        serializer=self.permission_Testing(request, model_str, pk)
        # a=InitAuthorities()
        # a.start()
        return ResponseFactory(serializer.data)

    def post(self, request, model_str,pk=None,format=None):
        # data={}
        # for key in request.data:
            # data[key]=request.data[key]
        # model_obj, serializer_calss = self.get_objs(model_str)
        # serializer = serializer_calss(data=data)
        serializer=self.permission_Testing(request, model_str, pk)
        if serializer.is_valid():
            serializer.save()
            return ResponseFactory(serializer.data, status=201)
        return ResponseFactory(serializer.data, status=201)

#GET_ONE,PUT_ONE,DELETE_ONE
class ResourcesDetail(APIViewProfile):

    def get(self, request, model_str,pk=None, format=None):
        serializer=self.permission_Testing(request, model_str, pk)
        return ResponseFactory(serializer.data)

    def put(self, request, model_str,pk, format=None):
        serializer=self.permission_Testing(request, model_str, pk)
        if not serializer:
            return Response({'error':'数据无效'})
        if serializer.is_valid():
            serializer.save()
            return ResponseFactory(serializer.data)
        else:
            return Response({'error':'数据无效'})
        #return ResponseFactory(serializer.errors, status=400)

    def delete(self, request, model_str,pk, format=None):
        model_obj, serializer_calss, model_detail = self.get_objs(model_str, pk)
        serializer = serializer_calss(model_detail)
        model_detail.delete()
        return ResponseFactory(serializer.data,status=240)




