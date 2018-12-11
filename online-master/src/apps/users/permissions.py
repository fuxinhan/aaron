from rest_framework import permissions

#permissions.BasePermission
class ReadOnly:
    def has_permission(self,request,views,*args):
        if request.method in permissions.SAFE_METHODS:
           return True
        else:
            return False

class BasePermission:
    def is_permission(self,request,res_user,action):
        try:
            return eval('self.'+action)(request,res_user)
        except:
            return False
    def GET(self,request,res_user):
        return False
    def POST(self,request,res_user):
        return False
    def PUT(self,request,res_user):
        return False
    def DELETE(self,request,res_user):
        return False



class UserReadOnlyOrOwnerOnly(BasePermission):

    def GET(self,request,res_user):
        return True

    def PUT(self,request,res_user):
        if request.user==res_user:
            return True
        else:
            return True
            return False

















