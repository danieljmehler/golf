from round.serializers import RoundSerializer
from .models import Golfer
from rest_framework import serializers


class GolferSerializer(serializers.HyperlinkedModelSerializer):

    rounds = RoundSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = Golfer
        fields = ['url', 'username', 'email', 'groups', 'handicap', 'rounds']

