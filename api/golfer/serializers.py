from .models import Golfer
from rest_framework import serializers


class GolferSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Golfer
        fields = ['url', 'username', 'email', 'rounds']

