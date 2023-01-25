from django.db import models
from course.models import Course


class Tee(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='tees'
    )
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ['course', 'name']

    def __str__(self):
        return "{} | {}".format(self.course, self.name)