from django.db import models
from users import models as users_models
from users.models import UserProfile as Users


'''
权限控制表：
    Users用户表 
    Groups组表 
    Tables表集合 
    GroupAuthorities组权限 
    Action动作表
课程相关表：
    Teachers老师表 
    Students学生表 
    Courses课程表 
    Classes班级表 
    Notes笔记表 
    Questions提问表 
    Lives直播课程表 
其他：
    Customs自定义表 
关系表：
    UsersGroups用户-组 
    TeacherClasses老师-班级 
    UsersCourses用户-课程 
    CustomsCourses自定义-课程 
    StudentsParents学生家长 
系统：
    Log访问记录 

Articles文章表
Comments评论表
Favors点赞表
Collections收藏表
'''
# ---------------------------------------------------------------------------------A

#动作GET，POST，PUT，DELETE
class Action(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name=models.CharField(max_length=10)
    class Meta:
        ordering = ('created',)

# ---------------------------------------------------------------------------------B
# ---------------------------------------------------------------------------------C

#课程表
class Courses(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    course_name=models.CharField(max_length=30,unique=True)

#班级表
class Classes(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name=models.CharField(max_length=30)

#自定义表
class Customs(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name=models.CharField(max_length=30)

#自定义分类-课程关联表
class CustomsCourses(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    customs=models.ForeignKey(to='Customs',to_field='id',on_delete=True)
    courses=models.ForeignKey(to='Courses',to_field='id',on_delete=True)



# ---------------------------------------------------------------------------------D
# ---------------------------------------------------------------------------------E
# ---------------------------------------------------------------------------------F
# ---------------------------------------------------------------------------------G

#组
class Groups(models.Model):
    created=models.DateTimeField(auto_now_add=True)
    group=models.CharField(max_length=10)

    class Meta:
        ordering = ('created',)

#组权限
class GroupAuthorities(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    group=models.ForeignKey(to="Groups", to_field="id",on_delete=True)
    table=models.ForeignKey(to="Tables", to_field="id",on_delete=True)
    action=models.ForeignKey(to="Action", to_field="id",on_delete=True)

# ---------------------------------------------------------------------------------H
# ---------------------------------------------------------------------------------I
# ---------------------------------------------------------------------------------J
# ---------------------------------------------------------------------------------K
# ---------------------------------------------------------------------------------L

#直播课程direct broadcast
class Lives(models.Model):
    live_name=models.CharField(max_length=50)
    start_time=models.DateTimeField()
    end_time=models.DateTimeField()
    long_time=models.IntegerField(null=True)
    tab=models.BooleanField(default=False)

# ---------------------------------------------------------------------------------M
# ---------------------------------------------------------------------------------N

#笔记表
class Notes(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    note_content=models.TextField()
    course_name=models.ForeignKey(Courses,on_delete=True)
    user_name=models.ForeignKey(Users,to_field='name',on_delete=True,null=True)

# ---------------------------------------------------------------------------------O
# ---------------------------------------------------------------------------------P
# ---------------------------------------------------------------------------------Q

#提问表
class Questions(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    questions_content=models.TextField()
    course_name=models.ForeignKey(Courses,on_delete=True)
    user_name=models.ForeignKey(Users,to_field='name',on_delete=True)

# ---------------------------------------------------------------------------------R
# ---------------------------------------------------------------------------------S

#学生表
class Students(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username=models.OneToOneField(Users,on_delete=True)

#学生直播关联表student and live
class StudentsLives(models.Model):
    student_name=models.ForeignKey(Users,on_delete=True)
    live_name=models.ForeignKey(Lives,on_delete=True)

#学生老师关联表
class StudentsTeachers(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    student_name=models.ForeignKey(Users,on_delete=True,related_name='StudentsTeachers_student')
    teacher_name=models.ForeignKey(Users,on_delete=True,related_name='StudentsTeachers_teacher')

#学生家长关联表
class StudentsParents(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    parent_name=models.ForeignKey(Users,on_delete=True,related_name='StudentsParents_parent')
    student_name=models.ForeignKey(Users,on_delete=True,related_name='StudentsParents_student')

# ---------------------------------------------------------------------------------T

#表集合
class Tables(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name=models.CharField(max_length=100,unique=True)

    class Meta:
        ordering = ('created',)


#老师-班级
class TeacherClasses(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    teacher=models.ForeignKey(to='Teachers',to_field='id',on_delete=True)
    classes=models.ForeignKey(to='Classes',to_field='id',on_delete=True)


#老师表
class Teachers(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username=models.ForeignKey(Users,on_delete=True)

# ---------------------------------------------------------------------------------U

#用户-组
class UsersGroups(models.Model):
    created=models.DateTimeField(auto_now_add=True)
    name=models.ForeignKey(Users,on_delete=True)
    group=models.ForeignKey(to='Groups',to_field='id',on_delete=True)

#用户-课程
class UsersCourses(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user_name=models.ForeignKey(Users,on_delete=True)
    courses=models.ForeignKey(to='Courses',to_field='id',on_delete=True)

#用户-vip课程关联表
class UsersVipCustoms(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user_name=models.ForeignKey(Users,on_delete=True)
    vipcustom=models.ForeignKey(to='VipCustoms',on_delete=True)



# ---------------------------------------------------------------------------------V

#vip课程
class VipCustoms(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name=models.CharField(max_length=32)

#vip课程分类与课程的关联
class VipCustomsCourses(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    vipcustom=models.ForeignKey(VipCustoms,on_delete=True)
    course=models.ForeignKey(Courses,on_delete=True)


# ---------------------------------------------------------------------------------W
# ---------------------------------------------------------------------------------X
# ---------------------------------------------------------------------------------Y
# ---------------------------------------------------------------------------------Z












