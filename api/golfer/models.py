from django.db import models
from django.contrib.auth.models import AbstractUser


class Golfer(AbstractUser):
    handicap = models.DecimalField(max_digits=5, decimal_places=2, default=999.99)
