from rest_framework import viewsets
from rest_framework import permissions
from .models import HoleScore
from .serializers import HoleScoreSerializer


class HoleScoreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows HoleScores to be viewed or edited.
    """
    queryset = HoleScore.objects.all()
    serializer_class = HoleScoreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
