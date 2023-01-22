from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Golfer

admin.site.register(Golfer, UserAdmin)