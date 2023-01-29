from .models import HoleScore
from rest_framework import serializers


class HoleScoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HoleScore
        fields = ['url', 'id', 'round', 'hole', 'score']