from course.serializers import CourseSerializer
from .models import Round
from rest_framework import serializers


class RoundSerializer(serializers.HyperlinkedModelSerializer):

    course = CourseSerializer(many=False, required=True)

    class Meta:
        model = Round
        # fields = ['url', 'golfer', 'date', 'course', 'parnters', 'scores']
        fields = ['url', 'golfer', 'date', 'course']

