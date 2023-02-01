from course.serializers import CourseSerializer
from golfer.serializers import GolferSerializer
from tee.serializers import TeeSerializer
from .models import Round
from rest_framework import serializers


class RoundSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Round
        fields = ['url', 'id', 'golfer', 'date', 'course', 'tee', 'holes']

