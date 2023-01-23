from .models import Course
from tee.serializers import TeeSerializer
from rest_framework import serializers


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    tees = TeeSerializer(many=True, required=True)
    class Meta:
        model = Course
        # fields = ['url', 'name', 'holes']
        fields = ['url', 'name', 'tees']

