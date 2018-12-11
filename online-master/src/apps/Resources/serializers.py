from rest_framework import serializers
from .models import *
from users.models import UserProfile as Users
import json
import datetime


#处理外键的基类序列化
class MyBaseSerializer(object):
    model=None
    #{'字段名':[model,'外键字段名']}
    ForeignKey={}
    fields = ()
    def __new__(cls,*args,**kwargs):
        obj=object.__new__(cls)
        obj.model=cls.model
        obj.fields=cls.fields
        obj.ForeignKey=cls.ForeignKey
        obj.info=[]
        return obj


    def __init__(self,obj=None,data=None,many=None,partial=True):
        if not obj and not data:
            self.data=[]
            return
        self.error={'error':[]}
        self.obj=obj
        self.data=data
        self.data_obj=data
        if data:
            self.data_obj=dict(data)
        if not many:
            if obj and not data:
                self.read()
            elif data and not obj:
                self.create()
            elif obj and data:
                self.update()
        elif many and obj and not data:
            self.many_obj_handler()

    def create(self):
        self.get_real_data()
        status=self.model.objects.filter(**self.data_obj)
        if status:
            self.valid=False
            self.error['error'].append('不允许重复添加')
            return
        self.model_obj=self.model(**self.data_obj)

    def get_real_data(self):
        for i in self.data_obj:
            if i in self.ForeignKey:
                foreignkey_model=self.ForeignKey[i][0]
                key=self.ForeignKey[i][1]
                value=self.data_obj[i]
                args={key:value}
                obj=foreignkey_model.objects.filter(**args)
                if len(obj) != 1:
                    self.info.append(str(obj)+':未查询到结果或未查询到唯一的结果')
                    return
                else:
                    obj=obj.first()
                self.data_obj[i]=obj

    def save(self):
        self.model_obj.save()

    def update(self):
        self.get_real_data()
        for key in self.data_obj:
            setattr(self.obj,key, self.data_obj[key])
        self.model_obj=self.obj


    def read_(self, model):
        dict={}
        print(self.fields)
        print(self.ForeignKey)
        for i in self.fields:
            if i in self.ForeignKey:
                print('555',i)
                data_obj=getattr(model,i)
                try:
                    data=getattr(data_obj,self.ForeignKey[i][1])
                except:
                    data='{}.{}信息加载失败'.format(str(data_obj),str(self.ForeignKey[i][1]))
                dict[i]=data
            else:
                dict[i]=getattr(model,i)

        return dict

    def data_format(self):
        self.data_obj=json.dumps(self.data_obj,cls=ComplexEncoder,ensure_ascii=False)
        # self.data_obj=json.dumps(self.data_obj,cls=ComplexEncoder)

    def read(self):
        self.data_obj=self.read_(self.obj)
        self.data_format()
        self.data=self.data_obj

    def many_obj_handler(self):
        # if self.request
        resulte=[]
        for obj in self.obj:
            resulte.append(self.read_(obj))
        self.data_obj=resulte
        self.data_format()
        self.data=self.data_obj


    def is_valid(self):
        try:
            if not self.valid:
                self.data=self.error
                return False
        except:
            pass
        return True

#解析时间对象
class ComplexEncoder(json.JSONEncoder):

    def default(self,obj):
        if isinstance(obj,datetime.datetime):
            return str(obj)
        elif isinstance(obj,datetime.date):
            return str(obj)
        elif isinstance(obj,type(None)):
            return 'None值'
        else:
            try:
                return json.JSONEncoder.default(self,obj)
            except:
                return '无法解析的数据类型，请联系管理员'

#-------------------------------------------------------------------------------A
#动作表
class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ('id', 'name',)
#-------------------------------------------------------------------------------B
#-------------------------------------------------------------------------------C
#自定义课程分类与课程之间的关系序列化
class CustomsCoursesSerializer(MyBaseSerializer):
    model=CustomsCourses
    ForeignKey = {'customs':[Customs,'name'],'courses':[Courses,'course_name']}
    fields={'id','created','customs','courses'}
#自定义课程分类序列化器
class CustomsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customs
        fields = ('id','created','name')
#课程序列化
class CoursesSerializer(serializers.ModelSerializer):

    class Meta:
        model=Courses
        fields=('id','course_name',)
#-------------------------------------------------------------------------------D
#-------------------------------------------------------------------------------E
#-------------------------------------------------------------------------------F
#-------------------------------------------------------------------------------G
#组权限表
class GroupAuthoritiesSerializer(MyBaseSerializer):
    model=GroupAuthorities
    ForeignKey={'group':[Groups,'group'],'table':[Tables,'name'],'action':[Action,'name']}
    fields = ('id','created','group','table','action')
#组表
class GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields=('id','group',)
#-------------------------------------------------------------------------------H
#-------------------------------------------------------------------------------I
#-------------------------------------------------------------------------------J
#-------------------------------------------------------------------------------K
#-------------------------------------------------------------------------------L
#直播课程表lives
class LivesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Lives
        fields = ('id','live_name','start_time','end_time','long_time','tab')
#-------------------------------------------------------------------------------M
#-------------------------------------------------------------------------------N
#笔记表
class NotesSerializer(MyBaseSerializer):
    model=Notes
    ForeignKey={'course_name':[Courses,'course_name'],'user_name':[Users,'name']}
    fields = ('id','created','note_content','course_name','user_name')
#-------------------------------------------------------------------------------O
#-------------------------------------------------------------------------------P
#-------------------------------------------------------------------------------Q
#提问表
class QuestionsSerializer(MyBaseSerializer):
    model=Questions
    ForeignKey={'course_name':[Courses,'course_name'],'user_name':[Users,'name']}
    fields = ('id','created','questions_content','course_name','user_name')
#-------------------------------------------------------------------------------R
#-------------------------------------------------------------------------------S
#学生家长表关联表
class StudentsParentsSerializer(MyBaseSerializer):
    model=StudentsParents
    ForeignKey={'parent_name':[Users,'name'],'student_name':[Users,'name']}
    fields = ('id','created','parent_name','student_name')

#学生直播课关联表
class StudentsLivesSerializer(MyBaseSerializer):
    model=StudentsLives
    ForeignKey = {'student_name':[Users,'name'],'live_name':[Lives,'live_name']}
    fields={'student_name','live_name',}
#-------------------------------------------------------------------------------T
#模型表
class TablesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tables
        fields = ('id', 'name',)
#-------------------------------------------------------------------------------U

#用户表
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        username= serializers.CharField(read_only=True)
        fields = ('id', 'name',  'mobile','photo','username')

#用户组关联表
class UsersGroupsSerializer(MyBaseSerializer):
    model=UsersGroups
    ForeignKey={'name':[Users,'name'],'group':[Groups,'group']}
    fields = ('id','created','name','group')

#用户课程关联表
class UsersCoursesSerializer(MyBaseSerializer):
    model=UsersCourses
    ForeignKey={'user_name':[Users,'name'],'courses':[Courses,'course_name']}
    fields = ('id','created','user_name','courses')

#用户课程关联表
class UsersVipCustomsSerializer(MyBaseSerializer):
    model=UsersCourses
    ForeignKey={'user_name':[Users,'name'],'vipcourses':[VipCustoms,'name']}
    fields = ('id','created','user_name','vipcourses')




#-------------------------------------------------------------------------------V

#vip课程分类
class VipCustomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VipCustoms
        fields = ('id', 'created','name')

#vip课程分类与课程关联
class VipCustomsCoursesSerializer(MyBaseSerializer):
    model=VipCustomsCourses
    ForeignKey={'vipcustom':[VipCustoms,'name'],'course':[Courses,'course_name']}
    fields = ('id','created','vipcustom','course')



#-------------------------------------------------------------------------------W
#-------------------------------------------------------------------------------X
#-------------------------------------------------------------------------------Y
#-------------------------------------------------------------------------------Z



















