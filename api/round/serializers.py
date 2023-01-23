from holescore.serializers import HoleScoreSerializer
from .models import Round
from rest_framework import serializers


class RoundSerializer(serializers.HyperlinkedModelSerializer):

    course = serializers.SlugRelatedField(many=False, slug_field='name', read_only=True)
    tee = serializers.SlugRelatedField(many=False, slug_field='name', read_only=True)
    holes = HoleScoreSerializer(many=True, required=True)

    class Meta:
        model = Round
        # fields = ['url', 'golfer', 'date', 'course', 'parnters', 'scores']
        fields = ['url', 'golfer', 'date', 'course', 'tee', 'holes']

