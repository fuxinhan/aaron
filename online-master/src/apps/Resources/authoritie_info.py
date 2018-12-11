#指定高级管理员name，必须存在于用户表
ADMIN='闫成欣'
#允许所有组访问的模型
ALL_ALLOW=[['Questions','GET'],]
#组权限详情
GROUPSAUTHORITIES={
'游客':[['Customs','GET'],],
'用户':[['Customs','GET'],['Users','GET'],],
'高级管理员':[],
'学生':[['Customs','GET'],],
'家长':[],
'老师':[],
'前端管理员':[['Customs','*'],['CustomsCourses','*'],],
'业务管理员':[['StudentsParents','*'],['VipCustoms','*'],['VipCustomsCourses','DELETE'],['Customs','*'],],
}
#请求动作
ACTIONS=['GET','POST','PUT','DELETE']
#需要清空的权限表
DELETE=['Groups','UsersGroups','Tables','Action',]

















