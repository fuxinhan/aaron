from random import choice
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import viewsets, status, mixins, permissions, authentication
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler
from .serializers import *
# from utils.yunpian import YunPian
# from djangoreactredux.settings.base import APIKEY
from .models import VerifyCode,UserProfile
from .permissions import *
from rest_framework import generics
from rest_framework.views import APIView
import json
from Resources import models as Res_models
from django.contrib.auth.hashers import make_password, check_password
import requests
import json
from Resources.serializers import UsersSerializer
import random


User = get_user_model()

#发送短信验证码
class SendSMS:
    '''
    get参数:
    account=用户账号
    ts=yyyyMMddHHmmss
    pswd=用户密码
    mobile=1234545,1323434
    msg=【签名】正式内容
    needstatus=是否需要状态报告，取值true或false
    product=订购的产品id
    resptype='json'
    https://120.27.244.164/msg/HttpBatchSendSM?account=QT-yybb&
    pswd=Net263yy&mobile=17686988582&
    msg=%E3%80%90%E7%93%A6%E5%8A%9B%E5%B7%A5%E5%8E%82%E3%80%911234&
    needstatus=True&resptype=json
    '''

    def __init__(self,mobile,code,reg=True):
        if reg:
            text='瓦力工厂机器人少儿编程教育欢迎你,注册账号,若不是本人操作，请忽略此条短信'
        else:
            text='瓦力工厂机器人少儿编程教育欢迎你,修改密码,若不是本人操作，请忽略此条短信'
        self.url='http://120.27.244.164/msg/HttpBatchSendSM'
        self.text='【{}】'.format(text)
        self.args={'account':'QT-yybb','pswd':'Net263yy','mobile':mobile,
                   'msg':self.text+code,'needstatus':'True','resptype':'json'}
        self.get_url()

    def get_url(self):
        args_all=''
        for key in self.args:
            args='{}={}&'.format(key,self.args[key])
            args_all=args_all+args
        self.url=self.url+'?'+args_all[:-1]

    def send(self):
        response = requests.get(self.url)
        data=json.loads(response.text)
        status=data['result']
        if not status:
            return True
        else:
            error={103:'提交过快（同时时间请求验证码的用户过多）',104:'短信平台暂时不能响应请求',
                   107:'包含错误的手机号码',109:'无发送额度（请联系管理员）',110:'不在发送时间内',
                   111:'短信数量超出当月发送额度限制，请联系管理员'}
            error_info=error.get(status)
            if error_info:
                self.error_info=error_info
            else:
                self.error_info='未知错误'
            return False


#短信验证码
class SmsCode(APIView):

    def __init__(self,*args,**kwargs):
        self.serializer_class=SmsSerializer
        super().__init__(*args,**kwargs)

    def post(self,request,pk,*args,**kwargs):
        if pk=='1':
            #注册
            self.serializer=self.serializer_class(data=request.data,reg=True)
            self.serializer.is_valid(raise_exception=True)
            return self.create(request)
        elif pk=='2':
            #修改
            mobile=request.data.get('mobile')
            if mobile:
                user=UserProfile.objects.filter(mobile=mobile).first()
                if user:
                    self.serializer = self.serializer_class(data=request.data, reg=False)
                    self.serializer.is_valid(raise_exception=True)
                    return self.create(request)
                else:
                    return Response({'error':'手机号不存在'})
            else:
                return Response({'error':'手机号为必填项'})

    def get_code(self):
        """ 生成四位数字的验证码 """
        seeds = "1234567890"
        random_str = []
        for i in range(4):
            random_str.append(choice(seeds))
        code="".join(random_str)
        return code

    def create(self, request, *args, **kwargs):
        mobile = self.serializer.validated_data["mobile"]
        # yun_pian = YunPian(APIKEY)
        code = self.get_code()
        #response=SendSMS(mobile=mobile,code=code)
        #info=response.send()
        info = True
        # sms_status = yun_pian.send_sms(code=code, mobile=mobile)

        if not info:  # 云片网api返回0表示发送成功
            return Response({
                # "mobile": response.error_info
                "mobile": r'测试的错误信息'
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(code)

            code_record = VerifyCode(code=code, mobile=mobile)
            code_record.save()
            return Response({
                "mobile": mobile
            }, status=status.HTTP_201_CREATED)


#注册用户


class UserViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    用户注册-个人信息管理
    """
    serializer_class = UserRegSerializer
    queryset = User.objects.order_by('id')
    authentication_classes = (JSONWebTokenAuthentication, authentication.SessionAuthentication, )
    def get_serializer_class(self):
        if self.action == "retrieve":
            return UserDetailSerializer
        elif self.action == "create":
            return UserRegSerializer

        return UserDetailSerializer

    def get(self,request):
        serializer=UsersSerializer(request.user)
        return Response(serializer.data)
    # permission_classes = (permissions.IsAuthenticated, )

    def get_permissions(self):
        if self.action == "retrieve":
            return [permissions.IsAuthenticated()]
        elif self.action == "create":
            return []

        return []  # 返回默认值为空一定要加，否则会出错的

    def get_random(self):
        s=''
        for i in range(20):
            start=ord('a')
            end=ord('z')
            t=random.randint(start,end)
            s=s+chr(t)
        return s

    def create(self, request, *args, **kwargs):
        username=self.get_random()
        name=self.get_random()
        data={'username':username,'name':name,'mobile':request.data.get('mobile'),
              'code':request.data.get('code'),'password':request.data.get('password')}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        re_dict = serializer.data
        payload = jwt_payload_handler(user)
        re_dict["token"] = jwt_encode_handler(payload)
        re_dict["name"] = user.name if user.name else user.username
        headers = self.get_success_headers(serializer.data)
        return Response(re_dict, status=status.HTTP_201_CREATED, headers=headers)

    def get_object(self):
        return self.request.user

    def perform_create(self, serializer):
        save=serializer.save()
        #初始化注册用户为‘用户’组
        group=Res_models.Groups.objects.get(group='用户')
        init_group=Res_models.UsersGroups(name=save,group=group)
        init_group.save()
        return save

    def put(self,request,*args):
        print('运行到这里')
        password=request.data.get('password')
        if not password:
            return Response({'error':'password为必填的字段'})
        else:
            code=request.data.get('code')
            return self.sms_to_new_password(request,code)
    
    def sms_to_new_password(self,request,code):
        if not code:
            return Response({'error':'code为必填的字段'})
        mobile=request.data.get('mobile')
        if not mobile:
            return Response({'error':'mobile为必填的字段'})

        password=request.data.get('password')
        if not password:
            return Response({'error':'password为必填'})
        user=UserProfile.objects.filter(mobile=mobile).first()
        if user:
            five_mintes_ago = datetime.now() - timedelta(hours=0, minutes=5, seconds=0)
            verify_records = VerifyCode.objects.filter(mobile=user.mobile,code=code,add_time__gt=five_mintes_ago)
            if not verify_records and 0:
                raise serializers.ValidationError("验证码无效或过期")
            else:
                user.set_password(password)
                user.save()
                return Response({'success': '密码修改成功','mobile':mobile,'id':user.id}, status=200)
        else:
            return Response({'error':'没有找到对应的用户，请核对信息是否正确'})


#扩展的APIView类
class BaseAPIView(APIView):
    serializer=None
    permission_classes_ = ()
    action=()


    def permission(self,request,pk,action):
        res_user=self.get_user(pk)
        if action not in self.action:
            return False
        for p in self.permission_classes_:
            temp = p()
            if temp.is_permission(request,res_user,action):
                return True
        return False

    def __new__(cls,*args,**kwargs):
        obj=super().__new__(cls,*args,**kwargs)
        obj.serializer_class=cls.serializer
        obj.permission_classes_=cls.permission_classes_
        obj.action=cls.action
        obj.error_1={"error":"权限不足"}
        obj.error_2={"error":"提供的数据无法序列化"}
        return obj


    def get_user(self,pk):
        self.res_user=UserProfile.objects.filter(pk=pk).first()
        return self.res_user


#详细的用户信息操作
class UserDetail(BaseAPIView):
    serializer=UserDetailSerializer
    permission_classes_ = (UserReadOnlyOrOwnerOnly,)
    action=('GET','PUT')


    def get(self,request,pk,*args):
        if not self.permission(request,pk,'GET'):
            return Response(self.error_1)
        serializer=self.serializer_class(self.res_user)
        return Response(serializer.data)








from django.http import HttpResponse
def code(request):
    one_mintes_ago = datetime.now() - timedelta(hours=0, minutes=60, seconds=0)
    obj=VerifyCode.objects.filter(add_time__gt=one_mintes_ago).first()
    if obj:
        m=obj.mobile
        code=obj.code
    else:
        m='最近1小时没有注册'
        code='xxx'
    other='有时候可能会在这里传输某些东西。。。<br><br><br><br><br>'
    t='''
╭-------------Welcome-------------<br>
┊╭⌒　╭⌒╮<br>
┊　︶ 　︶︶　　　　<br>
┊╱◥██◣╭⌒╮～╭⌒╮　<br>
┊┊田┊╱◥██◣`·..·′<br>
┊┊田┊｜田┊　田┊<br>
┊︼︼︼︼︼︼︼︼︼　<br>
╰------------------------------------'''
    info='手机号：{},验证码：{}'.format(m,code)+'<br><br>'+other+t
    return HttpResponse(info)






















from rest_framework_jwt.authentication import JSONWebTokenAuthentication


