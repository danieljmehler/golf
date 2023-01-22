from rest_framework import viewsets
from rest_framework import permissions
from .models import Golfer
from .serializers import GolferSerializer


class GolferViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Golfers to be viewed or edited.
    """
    queryset = Golfer.objects.all().order_by('-date_joined')
    serializer_class = GolferSerializer
    permission_classes = [permissions.IsAuthenticated]
