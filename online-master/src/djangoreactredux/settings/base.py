# coding=utf-8
"""Django settings for djangoreactredux project."""

import os
import sys
import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))  # remove /sswmain/settings to get base folder
sys.path.insert(0, os.path.join(BASE_DIR))
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))
sys.path.insert(0, os.path.join(BASE_DIR, 'extra_apps'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ajsdgas7&*kosdsa21[]jaksdhlka-;kmcv8l$#diepsm8&ah^'

DEBUG = True

# ALLOWED_HOSTS = ['localhost']
ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.staticfiles',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.admin',

    'rest_framework',
    # 'knox',
    'django_extensions',

    # 'accounts',
    'base',

    #'corsheaders',
    'xadmin',
    'crispy_forms',
    'django_filters',
    'rest_framework_swagger',
    # 'corsheaders',
    'users.apps.UsersConfig',
    #'test_0',
    'Resources',
)

# MIDDLEWARE_CLASSES = (
MIDDLEWARE = [
    'users.middleware.CORSMiddleware',
    # 'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    #'django.middleware.csrf.CsrfResponseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.common.CommonMiddleware',
    'users.middleware.AuthenticationMiddlewareJWT',
    #'Resources.middleware.Permission',
]
# GLOBAL_CSRF_CHECK=True
# if GLOBAL_CSRF_CHECK:
#     self.enforce_csrf(request)
# # )

# CORS_ORIGIN_ALLOW_ALL = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

ROOT_URLCONF = 'djangoreactredux.urls'

WSGI_APPLICATION = 'djangoreactredux.wsgi.application'

LANGUAGE_CODE = 'zh-hans'  # 'en-us'

TIME_ZONE = 'Asia/Shanghai'  # 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = False  # True

AUTH_USER_MODEL = 'users.UserProfile'  # 'accounts.User'

ACCOUNT_ACTIVATION_DAYS = 7  # days

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static_root')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static_dist'),
    # os.path.join(BASE_DIR, 'static'),
)

# store static files locally and serve with whitenoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ############# REST FRAMEWORK ###################
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (),
    'DEFAULT_AUTHENTICATION_CLASSES': (

        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
}


# ############ REST KNOX ########################
# REST_KNOX = {
#     'SECURE_HASH_ALGORITHM': 'cryptography.hazmat.primitives.hashes.SHA512',
#     'AUTH_TOKEN_CHARACTER_LENGTH': 64,
#     'USER_SERIALIZER': 'knox.serializers.UserSerializer'
# }

# ############ 自定义用户验证 ########################
# AUTHENTICATION_BACKENDS = (
#     'users.views.CustomBackend',
# )

# Django rest framework JWT 设置
JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
    'JWT_AUTH_HEADER_PREFIX': 'JWT',
}

# 手机号码正则表达式
REGEX_MOBILE = "^1[358]\d{9}$|^147\d{8}$|^176\d{8}$"

# 云片网设置
APIKEY = "a071913802e5d5fa50fb619b4a865b4a"

PAGE_CACHE_SECONDS = 1
















