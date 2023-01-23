from holeinfo.serializers import HoleInfoSerializer
from .models import Tee
from rest_framework import serializers


class TeeSerializer(serializers.HyperlinkedModelSerializer):

    holes = HoleInfoSerializer(many=True, required=True)
    class Meta:
        model = Tee
        # fields = ['url', 'golfer', 'date', 'course', 'parnters', 'scores']
        fields = ['url', 'name', 'holes']

