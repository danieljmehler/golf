from django.db import models

from golfer.models import Golfer


class Round(models.Model):
    golfer = models.ForeignKey(
        Golfer,
        on_delete=models.CASCADE,
        related_name='rounds'
    )
    date = models.DateTimeField('date')
