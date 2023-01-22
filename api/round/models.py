from django.db import models

from golfer.models import Golfer
from course.models import Course


class Round(models.Model):
    golfer = models.ForeignKey(
        Golfer,
        on_delete=models.CASCADE,
        related_name='rounds'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='course'
    )
    date = models.DateTimeField('date')
