from .models import *
from users.models import UserProfile
from .serializers import *
from .tools import LiveTesting
from django.db.models import Q
from django.http import QueryDict


#权限工厂
class PermissionFactory:
    def __new__(cls,request,*args,**kwargs):
        model_name = kwargs.get('model_str')
        resourcespermission=ResourcesPermission(request,*args,**kwargs)
        if not resourcespermission.status:
            try:
                model_class=eval(model_name+'Permission')
                return model_class(request,*args,**kwargs)
            except:
                return NoneData()
        else:
            return resourcespermission

#权限基类
class ResourcesPermission:
    Model=None
    allow_group=['*']
    def __new__(cls,request,*args,**kwargs):
        obj=super().__new__(cls)
        obj.Model=cls.Model
        obj.allow_group=cls.allow_group
        obj.none=NoneData()
        return obj

    def __init__(self,request,*args,**kwargs):
        self.pk=kwargs.get('pk')
        # self.request.data=self.del_list_attr(request)
        self.request=request
        self.request_data=self.del_list_attr(request)
        self.user=request.user
        if not hasattr(self.user,'name'):
            self.user=Users.objects.get(name='游客')
        self.usersgroups=UsersGroups.objects.filter(name=self.user)
        self.table=kwargs.get('model_str')
        self.table=Tables.objects.filter(name=self.table).first() if self.table else None
        self.action=Action.objects.filter(name=request.method).first()
        self.get_status()

    def get_status(self):
        # self.status=True
        # return
        self.status = False
        if not self.table or not self.action or not self.usersgroups:
            return
        for usersgroup in self.usersgroups:
            group=usersgroup.group
            self.authorities=GroupAuthorities.objects.filter(group=group,table=self.table,action=self.action)
            if self.authorities:
                self.status=True
                return
        self.status=False
    def del_list_attr(self,request):
        data_dict={}
        for key in request.data:
            if type(request.data[key])==list:
                try:
                    data_dict[key]=request.data[key][0]
                except:
                    data_dict[key]=None
            else:
                data_dict[key]=request.data[key]
        return data_dict



    def result(self,model_str,request):

        if '*' not in self.allow_group:
            args={'name':self.request.user,'group__group__in':self.allow_group}
            status=UsersGroups.objects.filter(**args)
            if not status:
                info='当前用户没有访问{}的权限'.format(model_str)
                return self.Error(info)
        self.rest_request=request
        self.SerializerClass = eval(model_str + 'Serializer')
        self.model_str=model_str
        handler=eval('self.'+self.request.method)
        return handler()

    class Error:
        def __init__(self,info=None):
            info={"error": "权限不足"} if not info else info
            # self.data=json.dumps(info,ensure_ascii=False)
            self.data={"error": info}
        def is_valid(self):
            return True
        def save(self):
            pass

    def GET(self):
        if self.pk:
            return self.get_sigle()
        else:
            return self.get_many()
    def get_sigle(self):
        return self.none
    def get_many(self):
        return self.none

#没有找到任何权限时，使用此类
class NoneData:
    def __init__(self):
        info = {"error": "权限不足"}
        self.data = json.dumps(info, ensure_ascii=False)
        self.status=None
    def result(self,*args,**kwargs):
        return self
# ---------------------------------------------------------------------A
# ---------------------------------------------------------------------B
# ---------------------------------------------------------------------C

#访问自定义课程分类表时的自定义权限
class CustomsPermission(ResourcesPermission):
    #得到与此分类关联的所有课程信息
    def get_sigle(self):
        if self.pk:
            args={'customscourses__customs__id':self.pk}
            all_courses_obj=Courses.objects.filter(**args)

            if all_courses_obj:
                serializer=CoursesSerializer(all_courses_obj,many=True)
                return serializer
            else:
                return self.none
        else:
            return self.none
# ---------------------------------------------------------------------D
# ---------------------------------------------------------------------E
# ---------------------------------------------------------------------F
# ---------------------------------------------------------------------G

#操作组用户的自定义权限
class GroupsPermission(ResourcesPermission):
    def get_many(self):
        args={'name':self.user,'group__group':'业务管理员'}
        # args={'name':self.user,'group__group':'家长'}
        status=UsersGroups.objects.filter(**args).first()
        if not status:
            return self.Error('当前用户没有权限访问组')

        allow_group = ['学生', '家长', '老师']
        args={'group__in':allow_group}
        groups_obj=Groups.objects.filter(**args)
        serializer=GroupsSerializer(groups_obj,many=True)
        return serializer

# ---------------------------------------------------------------------H
# ---------------------------------------------------------------------I
# ---------------------------------------------------------------------J
# ---------------------------------------------------------------------K
# ---------------------------------------------------------------------L

#直播课程的自定义权限
class LivesPermission(ResourcesPermission):

    '''
    直播课的相关信息,一个简单工厂,服务于一些特定的组
    '''

    def __new__(cls,request,*args,**kwargs):
        group_obj=UsersGroups.objects.filter(name=request.user).first()
        group=group_obj.group.group
        if group=='学生':
            return LivesStudentHandler(request,*args,**kwargs)
        elif group=='业务管理员':
            return LivesBusinessHandler(request,*args,**kwargs)
        elif group == '高级管理员':
            return LivesBusinessHandler(request, *args, **kwargs)
        else:
            return NoneData()

#学生组访问直播课信息时的自定义权限
class LivesStudentHandler(ResourcesPermission):

    '''
    学生组GET直播课列表时，返回最近的课程的信息
    学生组GET直播课详情时，返回详细的课程的信息
    '''

    Model = Lives
    def __init__(self,request,*args,**kwargs):
        self.live=LiveTesting(request.user)
        super().__init__(request,*args,**kwargs)

    def get_many(self):
        lives_obj=self.live.later_lives
        serializer=LivesSerializer(lives_obj,many=True)
        return serializer

    def get_sigle(self):
        result=self.Model.objects.filter(pk=self.pk).first()
        serializer=self.SerializerClass(result)
        return serializer


#业务管理员组访问直播信息时的自定义权限
class LivesBusinessHandler(ResourcesPermission):
    Model=Lives
    def get_many(self):
        result=self.Model.objects.all()
        serializer=self.SerializerClass(result,many=True)
        return serializer

    def get_sigle(self):
        result=self.Model.objects.filter(pk=self.pk).first()
        serializer=self.SerializerClass(result)
        return serializer

    def POST(self):
        self.time_handler()
        serializer=self.SerializerClass(data=self.data)
        return serializer

    def time_handler(self):
        data={key:self.rest_request.data.get(key) for key in self.rest_request.data}
        if data.get('start_time'):
            data['start_time']=self.get_time(data.get('start_time'))
        if data.get('end_time'):
            data['end_time']=self.get_time(data.get('end_time'))
        self.data=data

    def get_time(self,time_str):
        'parse looklike 2018-11-22-16-00-00'
        time_obj=datetime.datetime.strptime(time_str, '%Y-%m-%d-%H-%M-%S')
        return time_obj

    def PUT(self):
        self.time_handler()
        obj=self.Model.objects.filter(pk=self.pk).first()
        if not obj:
            return None
        for i in self.data:
            setattr(obj,i,self.data[i])
        serializer=LivesSerializer(obj,self.data, partial=True)
        return serializer

# ---------------------------------------------------------------------M
# ---------------------------------------------------------------------N
# ---------------------------------------------------------------------O
# ---------------------------------------------------------------------P
# ---------------------------------------------------------------------Q
# ---------------------------------------------------------------------R
# ---------------------------------------------------------------------S

#学生家长表权限
class StudentsParentsPermission(ResourcesPermission):
    Model=StudentsParents
    def GET(self):
        serializer=self.Error()
        result_obj = self.Model.objects.all()
        serializer = self.SerializerClass(result_obj)

        return serializer


# ---------------------------------------------------------------------T
# ---------------------------------------------------------------------U

#用户表自定义权限
class UsersPermission(ResourcesPermission):

    '''
    访问用户表的相关信息,一个简单工厂,服务于一些特定的组
    '''

    def __new__(cls,request,*args,**kwargs):
        group_obj=UsersGroups.objects.filter(name=request.user).first()
        group=group_obj.group.group
        if group=='家长':
            return UsersParentsPermission(request,*args,**kwargs)
        else:
            return NoneData()

#家长访问用户表时自定义权限
class UsersParentsPermission(ResourcesPermission):

    Model=Users

    def get_many(self):
        SPS=StudentsParents.objects.filter(parent_name=self.user)
        users_id=[self.user.id]
        for sp in SPS:
            users_id.append(sp.student_name.id)
        args={'pk__in':users_id}
        users=Users.objects.filter(**args)
        serializer=UsersSerializer(users,many=True)
        return serializer

    def get_sigle(self):
        user=Users.objects.filter(pk=self.pk).first()
        if user:
            serializer=UsersSerializer(user)
            return serializer
        else:
            return self.Error('没有找到这个用户')

    def PUT(self):
        user=Users.objects.filter(pk=self.pk).first()
        if user==self.user and user.name!='游客':
            data=self.request.data
            serializer=UsersSerializer(user,data=data,partial=True)
            return serializer
        else:
            return self.Error('您只能修改自己的信息')

#操作用课程关联表时的自定义权限
class UsersCoursesPermission(ResourcesPermission):
    def POST(self):
        allow=['用户','学生']
        for group in self.usersgroups:
            if group.group.group in allow:
                allow=False
                break
        if allow:
            return self.none
        data={'user_name':self.user.name,
        'courses':self.request.POST.get('courses')}
        serializer=UsersCoursesSerializer(data=data)
        return serializer
    def DELETE(self):
        usercourses=UsersCourses.objects.filter(pk=self.pk).first()
        if not usercourses:
            return self.Error('未找到资源')
        if usercourses.user_name==self.user:
            serializer=UsersCoursesSerializer(usercourses)
            usercourses.delete()
            return serializer
    def get_sigle(self):
        pass
    def get_many(self):
        args={'user_name':self.user}
        usercourses = UsersCourses.objects.filter(**args)
        serializer=UsersCoursesSerializer(usercourses)
        return serializer

#操作用户组关联表的自定义权限
class UsersGroupsPermission(ResourcesPermission):

    def PUT(self):
        args={'name':self.user,'group__group':'业务管理员'}
        # args={'name':self.user,'group__group':'家长'}
        status=UsersGroups.objects.filter(**args).first()
        if not status:
            return self.Error('当前用户没有权限访问组')

        allow_group = ['学生', '家长', '老师']
        usersgroups_obj=UsersGroups.objects.filter(pk=self.pk).first()
        if usersgroups_obj:
            if usersgroups_obj.group.group in allow_group:
                group=self.request.data.get('group')
                if group in allow_group:
                    data={'group':group}
                    serializer=UsersGroupsSerializer(usersgroups_obj,data=data,partial=True)
                    return serializer
                else:
                    info='当前用户没有权限将当前组修改为{}'.format(group)
                    return self.Error(info)
            else:
                return self.Error('当前用户没有权限操作这个组')
        else:
            return self.Error('查找的组不存在')


#用户-vip课程 自定义权限
class UsersVipCustomsPermission(ResourcesPermission):

    def get_many(self):
        name=self.request.data.get('user_name')
        args={'user_name':name}
        vipcustoms=UsersVipCustoms.objects.filter(**args).first()
        serializer=UsersVipCustomsSerializer(vipcustoms,many=True)
        return serializer

    def POST(self):
        user_name=self.request.data.get('user_name')
        vipcustom=self.request.data.get('vipcustom')
        args={'user_name':user_name,'vipcustom':vipcustom}
        user_custom=UsersVipCustoms.objects.filter(**args)
        if user_custom:
            return self.Error('添加失败,当前用户已经与{}系列课程存在关联'.format(vipcustom))
        else:
            serializer=UsersVipCustomsSerializer(data=self.request.data)
            return serializer



# ---------------------------------------------------------------------V

#vip课程分组与课程的关联
class VipCustomsCoursesPermission(ResourcesPermission):
    allow_group = ['业务管理员']
    def get_many(self):
        vipcustom=self.request.data.get('vipcustom')
        args={'vipcustom__name':vipcustom}
        result=VipCustomsCourses.objects.filter(**args)
        print(result)
        serializer=VipCustomsCoursesSerializer(result,many=True)
        return serializer
    def get_sigle(self):
        result=VipCustomsCourses.objects.filter(pk=self.pk).first()
        if not result:
            return self.Error('查询的资源不存在')
        else:
            serializer=VipCustomsCoursesSerializer(result)
            return serializer

    def POST(self):
        vipcustom=self.request.data.get('vipcustom')
        course=self.request.data.get('course')
        if not vipcustom or not course:
            return self.Error('vipcustom及course项是必填的')
        print('------',self.request_data)
        args={'vipcustom__name':vipcustom,'course__course_name':course}
        status=VipCustomsCourses.objects.filter(**args)
        if status:
            return self.Error('已经存在{}与{}的关联'.format(vipcustom,course))
        else:
            serializer=VipCustomsCoursesSerializer(data=self.request_data)
            return serializer

# ---------------------------------------------------------------------W
# ---------------------------------------------------------------------X
# ---------------------------------------------------------------------Y
# ---------------------------------------------------------------------Z











































