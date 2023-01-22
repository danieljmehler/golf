from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Golfer

class GolferAdmin(UserAdmin):
    ...
    fieldsets = UserAdmin.fieldsets + (
        ("Golfer", {'fields': ['handicap']}),
    )

admin.site.register(Golfer, GolferAdmin)