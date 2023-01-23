from django.db import models
from tee.models import Tee


class HoleInfo(models.Model):
    tee = models.ForeignKey(
        Tee,
        on_delete=models.CASCADE,
        related_name='holes'
    )
    number = models.PositiveSmallIntegerField()
    par = models.PositiveSmallIntegerField()
    handicap = models.PositiveSmallIntegerField()
    yards = models.PositiveSmallIntegerField()

    class Meta:
        constraints = [
            models.CheckConstraint(
                name="Hole Number",
                check=models.Q(number__range=(1, 18))
            ),
            models.CheckConstraint(
                name="Par",
                check=models.Q(par__range=(1, 6))
            ),
            models.CheckConstraint(
                name="Handicap",
                check=models.Q(handicap__range=(1, 18))
            ),
            models.CheckConstraint(
                name="Yards",
                check=models.Q(yards__range=(1, 700))
            )
        ]
