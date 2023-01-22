from rest_framework import viewsets
from rest_framework import permissions
from .models import Round
from .serializers import RoundSerializer


class RoundViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Rounds to be viewed or edited.
    """
    queryset = Round.objects.all().order_by('-date')
    serializer_class = RoundSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
