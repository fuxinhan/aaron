# -*- coding: utf-8 -*-
import re
from datetime import datetime, timedelta
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from djangoreactredux.settings.base import REGEX_MOBILE
from .models import *


User = get_user_model()


class SmsSerializer(serializers.Serializer):
    def __init__(self,reg=True,*args,**kwargs):
        self.reg=reg
        super().__init__(*args,**kwargs)
    mobile = serializers.CharField(max_length=11, help_text="手机号")

    def validate_mobile(self, mobile):
        """ 验证手机号码  """
        if self.reg:
            # 手机是否注册
            if User.objects.filter(mobile=mobile).count():
                raise serializers.ValidationError("用户已经存在")
        else:
            # 手机是否存在
            if not User.objects.filter(mobile=mobile).count():
                raise serializers.ValidationError("手机号码不存在")
        # 验证手机号码是否合法
        if not re.match(REGEX_MOBILE, mobile):
            raise serializers.ValidationError("手机号码非法")
        # 验证发送频率
        one_mintes_ago = datetime.now() - timedelta(hours=0, minutes=1, seconds=0)
        if VerifyCode.objects.filter(add_time__gt=one_mintes_ago, mobile=mobile).count():
            raise serializers.ValidationError("距离上次发送未超过60秒")

        return mobile  # 验证通过返回 手机号


class UserDetailSerializer(serializers.ModelSerializer):
    """ 用户详情序列化类 """
    password=serializers.CharField(write_only=True)
    class Meta:
        model = User
        # fields = "__all__"
        fields=('id','name','birthday','gender','mobile','email','password')


class UserRegSerializer(serializers.ModelSerializer):
    """ 用户注册序列化 """
    code = serializers.CharField(required=True, max_length=4, min_length=4,
                                 write_only=True,
                                 label="验证码",
                                 error_messages={
                                     "blank": "请输入验证码",
                                     "required": "请输入验证码",
                                     "max_length": "验证码格式错误",
                                     "min_length": "验证码格式错误",
                                 }, help_text="验证码")
    username = serializers.CharField(required=True, allow_blank=False, label="账户", help_text="用户名",
                                     validators=[UniqueValidator(queryset=User.objects.all(),
                                                                 message="账户已经存在")])
    name=serializers.CharField(required=True, allow_blank=False, label="昵称", help_text="用户名",
                                     validators=[UniqueValidator(queryset=User.objects.all(),
                                                                 message="用户已经存在")])
    password = serializers.CharField(
        style={'input_type': 'password'}, label="密码", write_only=True, help_text="密码",
    )

    def validate_code(self, code):
        #verify_records = VerifyCode.objects.filter(mobile=self.initial_data["username"]).order_by("-add_time")
        verify_records = VerifyCode.objects.filter(mobile=self.initial_data["mobile"]).order_by("-add_time")
        if verify_records:
            last_records = verify_records[0]  # 最近的一个验证码
            five_mintes_ago = datetime.now() - timedelta(hours=0, minutes=10, seconds=0)  # 有效期为5分钟
            if five_mintes_ago > last_records.add_time:
                raise serializers.ValidationError("验证码过期")
            if last_records.code != code:
                raise serializers.ValidationError("验证码错误")  # 验证码输入错误
        else:
            raise serializers.ValidationError("验证码错误")  # 记录都不存在

    def validate(self, attrs):
        # attrs["mobile"] = attrs["username"]
        del attrs["code"]
        return attrs

    class Meta:
        model = User
        fields = ("username", 'name',"code", "mobile", "password")

class UserChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = "__all__"
        fields=('id','name','birthday','gender','mobile','email')


# class CoursesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Courses
#         fields=('courses_name',)
#
#
# class MyCoursesSerializer(serializers.ModelSerializer):
#     username=UserDetailSerializer(source='name')
#     course=CoursesSerializer(source='courses_name')
#     class Meta:
#         model=UserProfile2Courses
#         fields=('username','course',)
#
#     def __new__(cls,*args,**kwargs):
#         print('new')
#         print(args,kwargs)
#         obj=super().__new__(cls,*args,**kwargs)
#         print('恻恻恻')
#         return obj
#












