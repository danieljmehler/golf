from .models import Round
from rest_framework import serializers


class RoundSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Round
        # fields = ['golfer', 'date', 'course', 'parnters', 'scores']
        fields = ['url', 'golfer', 'date']

