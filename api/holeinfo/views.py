from rest_framework import viewsets
from rest_framework import permissions
from .models import HoleInfo
from .serializers import HoleInfoSerializer


class HoleInfoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows HoleInfos to be viewed or edited.
    """
    queryset = HoleInfo.objects.all().order_by('number')
    serializer_class = HoleInfoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
