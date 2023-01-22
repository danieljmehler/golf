from .models import Course
from rest_framework import serializers


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        # fields = ['url', 'name', 'holes']
        fields = ['url', 'name']

