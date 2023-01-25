from django.db import models

from golfer.models import Golfer
from course.models import Course
from tee.models import Tee


class Round(models.Model):
    golfer = models.ForeignKey(
        Golfer,
        on_delete=models.CASCADE,
        related_name='rounds'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='rounds'
    )
    tee = models.ForeignKey(
        Tee,
        on_delete=models.CASCADE,
        related_name='rounds'
    )

    date = models.DateTimeField('date')

    class Meta:
        ordering = ['golfer', 'course', 'tee', 'date']

    def __str__(self):
        return "{} | {} | {}".format(self.golfer, self.tee, self.date)