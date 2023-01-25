from .models import Round
from rest_framework import serializers


class RoundSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Round
        fields = ['url', 'golfer', 'date', 'course', 'tee', 'holes']

