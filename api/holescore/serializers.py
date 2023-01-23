from .models import HoleScore
from rest_framework import serializers


class HoleScoreSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = HoleScore
        fields = ['url', 'round', 'hole', 'score']

