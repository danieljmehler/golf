from tee.serializers import TeeSerializer
from .models import Course
from rest_framework import serializers


class CourseSerializer(serializers.HyperlinkedModelSerializer):

    tees = TeeSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Course
        fields = ['url', 'id', 'name', 'tees', 'rounds']

