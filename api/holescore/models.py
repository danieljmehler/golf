from django.db import models
from holeinfo.models import HoleInfo
from round.models import Round

# Create your models here.
class HoleScore(models.Model):
    hole = models.ForeignKey(
        HoleInfo,
        on_delete=models.CASCADE,
        related_name='scores'
    )
    round = models.ForeignKey(
        Round,
        on_delete=models.CASCADE,
        related_name='holes'
    )
    score = models.PositiveSmallIntegerField()