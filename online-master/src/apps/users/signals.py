# -*- coding: utf-8 -*-
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

User = get_user_model()


@receiver(post_save, sender=User)  # sender 参数是 Model
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:  # 是否是新建
        password = instance.password
        instance.set_password(password)
        instance.save()
        # Token.objects.create(user=instance)  # 我们使用jwt 方式，这里就不用创建 token 了
