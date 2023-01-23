from .models import HoleInfo
from holescore.serializers import HoleScoreSerializer
from rest_framework import serializers


class HoleInfoSerializer(serializers.HyperlinkedModelSerializer):

    scores = HoleScoreSerializer(many=True, required=True)

    class Meta:
        model = HoleInfo
        fields = ['url', 'number', 'tee', 'par', 'handicap', 'yards', 'scores']

