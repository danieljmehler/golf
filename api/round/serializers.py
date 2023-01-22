from course.serializers import CourseSerializer
from tee.serializers import TeeSerializer
from .models import Round
from rest_framework import serializers


class RoundSerializer(serializers.HyperlinkedModelSerializer):

    course = serializers.SlugRelatedField(many=False, slug_field='name', read_only=True)
    tee = serializers.SlugRelatedField(many=False, slug_field='name', read_only=True)

    class Meta:
        model = Round
        # fields = ['url', 'golfer', 'date', 'course', 'parnters', 'scores']
        fields = ['url', 'golfer', 'date', 'course', 'tee']

