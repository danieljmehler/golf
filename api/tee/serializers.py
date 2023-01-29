from .models import Tee
from rest_framework import serializers

class TeeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tee
        fields = ['url', 'id', 'name', 'course', 'holes']

