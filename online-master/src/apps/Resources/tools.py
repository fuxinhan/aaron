from Resources import models
from Resources import authoritie_info
from .models import Lives,StudentsLives,Users,StudentsParents
import datetime
import requests
import json
import time
import threading


#初始化权限
class InitAuthorities:
    '''
    根据配置文件更新组权限
    '''
    def __init__(self):

        self.count=0
        self.error=[]
        self.attrs=dir(models)
        self.admin_name=authoritie_info.ADMIN
        self.all_allow=authoritie_info.ALL_ALLOW
        self.group_auths=authoritie_info.GROUPSAUTHORITIES
        self.actions=authoritie_info.ACTIONS
        self.groups=list(self.group_auths.keys())
        #self.delete=authoritie_info.DELETE

    def start(self):
        print('开始配置权限')

        #得到models中所有模型字段
        print('得到模型中所有字段')
        self.get_all_model()

        #为Tables及Groups添加具体数据
        print('添加所有表及组进相应模型')
        self.init_table_group()

        #得到高级管理员的模型对象
        print('得到高级管理员模型对象')
        self.get_admin()

        #高级管理员得到所有的权限
        print('高级管理员得到所有模型的所有权限')
        self.admin_get_all_auth()

        #修改游客的用户组
        print('设置游客组')
        self.get_freeuser()

        #组得到配置的权限
        print('组得到配置的权限')
        self.group_get_custom_auth()

        #特定模型使所有组得到配置的权限
        print('特定模型使所有组得到配置的权限')
        self.all_get_custom_auth()

        print('所有的权限配置项都已加载完成')
        if self.count:
            print('没有发现配置新的权限，本次更新0条')
        else:
            print('共更新了{}条权限'.format(self.count))

    def get_all_model(self):
        self.models=[]
        for attr in self.attrs:
            first_ord=ord(attr[0])
            start_ord=ord('A')
            end_ord=ord('Z')
            if first_ord>=start_ord and first_ord<=end_ord:
                self.models.append(attr)

    def init_table_group(self):
        model=models.Tables
        for model_name in self.models:
            if not model.objects.filter(name=model_name).first():
                obj=model(name=model_name)
                obj.save()
                print('把{}模型加入Tables'.format(model_name))
                self.count+=1
        model=models.Groups
        for group_name in self.groups:
            if not model.objects.filter(group=group_name).first():
                obj=model(group=group_name)
                obj.save()
                print('把{}组加入Groups'.format(group_name))
                self.count+=1

    def make_error(self,info):
        self.error.append(info)

    def get_admin(self):
        try:
            self.admin=models.Users.objects.get(name=self.admin_name)
            self.admin_group=models.Groups.objects.get(group='高级管理员')
            status=models.UsersGroups.objects.filter(name=self.admin,group=self.admin_group).first()
            if not status:
                if models.UsersGroups.objects.filter(name=self.admin).first():
                    model=models.UsersGroups.objects.get(name=self.admin)
                    model.group=self.admin_group
                    model.save()
                    print('把用户{}移动到高级管理员组'.format(self.admin_name))
                else:
                    model=models.UsersGroups(name=self.admin,group=self.admin_group)
                    model.save()
                    print('把用户{}移动到高级管理员组'.format(self.admin_name))
                self.count+=1

        except:
            print('出错')
            self.make_error('初始化高级管理员时出错')
            return False

    def get_freeuser(self):
        user_obj=models.Users.objects.get(name='游客')
        group_obj=models.Groups.objects.get(group='游客')
        status=models.UsersGroups.objects.filter(name=user_obj,group=group_obj).first()
        if not status:
            try:
                obj=models.UsersGroups.objects.get(name=user_obj)
                obj.group=group_obj
            except:
                obj=models.UsersGroups(name=user_obj, group=group_obj)
            obj.save()
            print('游客组相关设置已完成')
            self.count+=1

    def admin_get_all_auth(self):
        for table in self.models:
            for action in self.actions:
                table_obj=models.Tables.objects.get(name=table)
                action_obj=models.Action.objects.get(name=action)
                status=models.GroupAuthorities.objects.filter(group=self.admin_group,table=table_obj,action=action_obj).first()
                if not status:
                    obj=models.GroupAuthorities(group=self.admin_group,table=table_obj,action=action_obj)
                    obj.save()
                    self.count+=1
                    print('现在允许高级管理员通过{}动作访问{}模型'.format(action,table))
        print('高级管理员已经获得所有表的所有权限')

    def group_get_custom_auth(self):
        for group in self.groups:
            for auth in self.group_auths[group]:
                table=auth[0]
                if auth[1]=='*':
                    actions=['GET','POST','PUT','DELETE']
                else:
                    actions=auth[1:]
                for action in actions:
                    group_obj=models.Groups.objects.get(group=group)
                    table_obj=models.Tables.objects.get(name=table)
                    action_obj=models.Action.objects.get(name=action)
                    status=models.GroupAuthorities.objects.filter(group=group_obj,table=table_obj,action=action_obj)
                    if not status:
                        obj=models.GroupAuthorities(group=group_obj,table=table_obj,action=action_obj)
                        obj.save()
                        self.count+=1
                        print('现在允许{}组以{}方式访问{}模型'.format(group,action,table))


    def all_get_custom_auth(self):
        for single in self.all_allow:
            table_name=single[0]
            table_obj=models.Tables.objects.get(name=table_name)
            if single[0]=='*':
                actions=['GET','POST','PUT','DELETE']
            else:
                actions=single[1:]
            for action in actions:
                action_obj=models.Action.objects.get(name=action)
                for group in self.groups:
                    group_obj=models.Groups.objects.get(group=group)
                    status=models.GroupAuthorities.objects.filter(group=group_obj,table=table_obj,action=action_obj).first()
                    if not status:
                        obj=models.GroupAuthorities(group=group_obj,table=table_obj,action=action_obj)
                        obj.save()
                        self.count+=1
                        print('现在允许{}组以{}方式访问{}模型'.format(group,action,table_name))

    def clear(self):
        print('启动清空程序')
        for table_name in self.delete:
            model=eval('models.'+table_name)
            a=model.objects.all()
            print(a)
            a.delete()
            print(2)
            print('已经清空{}表的所有内容'.format(table_name))

#直播课检测
class LiveTesting:

    '''
    查询直播课,参数user为Users实例时,查询当前用户相关直播信息
    参数user为默认值时,查询所有直播信息
    time_range=n时,可以查询未来n分钟即将开播的课程,默认值为15
    '''
    def __init__(self ,user=False,time_range=15):
        #lives_model
        self.time_range=time_range
        self.Lives =Lives
        self.data=[]
        #students--lives_model
        self.StudentsLives=StudentsLives
        if user:
            #user testing only
            self.user=user
            self.user_live_testing()
        else:
            #all testing
            self.all_live_testing()

    def user_live_testing(self):

        '''
        得到3个属性：
        self.lives：此用户所有直播课程，按时间排序
        self.later_lives：此用户即将开课的课程信息,根据参数self.time_range,单位为分钟
        self.liveing：此用户正在直播中的课程

        :return:None
        '''

        now = datetime.datetime.now()
        later_time = now + datetime.timedelta(minutes=self.time_range)
        #此学生的所有直播课
        args={'studentslives__student_name':self.user}
        self.lives=Lives.objects.filter(**args).order_by('start_time')
        #此学生即将开课的课程
        args={'end_time__gt':now,'start_time__gt':now,'start_time__lt':later_time}
        self.later_lives=self.lives.filter(**args)
        #此学生正在进行中的直播课
        temp=3
        temp_time=now - datetime.timedelta(hours=temp)
        args={'start_time__lt':now,'start_time__gt':temp_time}
        befor_temp_hours_lives=self.lives.filter(**args)
        ids=[]
        for live in befor_temp_hours_lives:
            long_time=datetime.timedelta(minutes=live.long_time)
            finish_time=live.start_time+long_time
            if finish_time>(now-datetime.timedelta(minutes=2)):
                ids.append(live.id)
        args={'id__in':ids}
        self.liveing=self.lives.filter(**args)


    def all_live_testing(self):

        '''
        self.all_lives:所有直播课,时间排序
        self.all_later_lives:即将开播,取决于self.time_range参数,参数为分钟
        self.all_liveing:正在直播的课程
        self.actors:即将开播的参与者集合
        :return:
        '''

        now = datetime.datetime.now()
        later_time = now + datetime.timedelta(minutes=self.time_range)
        # 所有直播课
        self.all_lives = Lives.objects.all().order_by('start_time')
        # 即将开课的课程
        args = {'end_time__gt': now, 'start_time__gt': now, 'start_time__lt': later_time}
        self.all_later_lives = self.all_lives.filter(**args)
        # 正在进行中的直播课
        temp = 3
        temp_time = now - datetime.timedelta(hours=temp)
        args = {'start_time__lt': now, 'start_time__gt': temp_time}
        befor_temp_hours_lives = self.all_lives.filter(**args)
        ids = []
        for live in befor_temp_hours_lives:
            long_time = datetime.timedelta(minutes=live.long_time)
            finish_time = live.start_time + long_time
            if finish_time > (now - datetime.timedelta(minutes=2)):
                ids.append(live.id)
        args = {'id__in': ids}
        self.all_liveing = self.all_lives.filter(**args)
        #参与者查询
        args={'studentslives__live_name__in':self.all_later_lives}
        self.actors=Users.objects.filter(**args)

#短信发送模块
class SendInfo:

    '''
    提供手机号,内容及可选的logo.通过send方法执行发送短信的动作
    '''

    def __init__(self,mobile,data,logo='瓦力工厂'):
        self.mobile=mobile
        self.data=data
        mobile=str(mobile)
        self.url='http://120.27.244.164/msg/HttpBatchSendSM'
        self.logo='【{}】'.format(logo)
        self.data=self.logo+data
        self.args={'account':'QT-yybb','pswd':'Net263yy','mobile':mobile,
                   'msg':self.data,'needstatus':'True','resptype':'json'}

    def get_url(self):
        args_all=''
        for key in self.args:
            args='{}={}&'.format(key,self.args[key])
            args_all=args_all+args
        self.url=self.url+'?'+args_all[:-1]
        print(self.url)

    def send(self):
        print('短信模拟发送成功')
        print('使用{}号码发送消息：{}'.format(self.mobile,self.data))
        return True
        response = requests.get(self.url)
        try:
            data=json.loads(response.text)
        except:
            self.error_info = '异常，不能解析短信服务器返回的数据'
            return False
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

#家长通知模块
class ParentNotice:

    '''
    提供Lives实例参数,为他们的家长发送通知短信
    '''

    def __init__(self,lives):
        self.lives=lives
        self.info='尊敬的家长，您好，您的孩子{}，于今日{}点{}分开课。请您引导孩子配合上课！谢谢！'

    # 开始运行
    def start(self):
        for live in self.lives:
            live.tab=True
            live.save()
            args = {'studentslives__live_name': live}
            students = Users.objects.filter(**args)
            for student in students:
                parent_mobile,data,live_name=self.info_format(student,live)
                self.send_one(parent_mobile,data)
                time.sleep(0.5)

    #信息格式化
    def info_format(self,student,live):
        student_name=student.name
        live_name=live.live_name
        args={'student_name':student}
        sp=StudentsParents.objects.filter(**args).first()
        parent_mobile=sp.parent_name.mobile
        start_time=live.start_time
        hour=start_time.hour
        minute=start_time.minute
        data=self.info.format(student_name,hour,minute)
        return parent_mobile,data,live_name

    #发送一条
    def send_one(self,mobile,data):
        sam=SendInfo(mobile,data)
        status=sam.send()
        return status

#自动通知脚本
class AutoScriptOfLive:

    '''
    在直播课开课之前,调用相关程序
    '''
    def __init__(self):
        self.rate=10
    def start(self):
        while True:
            self.live_obj=LiveTesting()
            args={'tab':False}
            live=self.live_obj.all_later_lives
            lives=live.filter(**args)
            if lives:
                print('存在即将开播的课程')
                P=threading.Thread(target=self.send_handler,args=(lives,))
                P.start()
                time.sleep(1)
            else:
                print('没有即将开播的课程')
                now = datetime.datetime.now()
                args={'start_time__gt':now,'tab':False}
                live=self.live_obj.all_lives.filter(**args).first()
                if live:
                    start_time=live.start_time
                    time_long=(start_time-now).seconds
                    time_long=time_long if time_long>self.rate else self.rate
                    print('下次检测在{}秒后'.format(time_long))
                    time.sleep(time_long)
                else:
                    print('没有任何直播课安排')
                    time.sleep(self.rate)
                    print('{}秒后重新检测'.format(self.rate))

    #新的线程负责去通知这个课程所有的家长
    def send_handler(self,lives):
        notice = ParentNotice(lives)
        notice.start()






def autoscript():
    script=AutoScriptOfLive()
    script.start()



def test():
    # return
    P=threading.Thread(target=autoscript)
    P.start()
    print('运行结束')



























