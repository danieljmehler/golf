from rest_framework import viewsets
from rest_framework import permissions
from .models import Tee
from .serializers import TeeSerializer


class TeeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tees to be viewed or edited.
    """
    queryset = Tee.objects.all()
    serializer_class = TeeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
