from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from base import views as base_views
from golfer import views as golfer_views

router = routers.DefaultRouter()
router.register(r'golfers', golfer_views.GolferViewSet)
router.register(r'groups', base_views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]