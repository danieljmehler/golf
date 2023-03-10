from .models import HoleInfo
from rest_framework import serializers


class HoleInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HoleInfo
        fields = ['url', 'id', 'number', 'tee', 'par', 'handicap', 'yards', 'scores']