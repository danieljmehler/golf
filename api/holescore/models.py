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

    class Meta:
        ordering = ['round', 'hole']

    def __str__(self):
        return "{} | Hole {} | Par {} | {}".format(self.round, self.hole.number, self.hole.par, self.score)