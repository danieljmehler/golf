from django.db import models
from django.contrib.auth.models import AbstractUser


class Golfer(AbstractUser):

    class Meta:
        ordering = ['username']

    def __str__(self):
        return self.username