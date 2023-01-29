from holeinfo.serializers import HoleInfoSerializer
from .models import Tee
from rest_framework import serializers

class TeeSerializer(serializers.HyperlinkedModelSerializer):
    holes = HoleInfoSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Tee
        fields = ['url', 'id', 'name', 'course', 'holes']

