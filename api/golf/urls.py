from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from base import views as base_views
from golfer import views as golfer_views
from round import views as round_views
from course import views as course_views
from tee import views as tee_views
from holeinfo import views as holeinfo_views
from holescore import views as holescore_views

router = routers.DefaultRouter()
router.register(r'golfers', golfer_views.GolferViewSet)
router.register(r'rounds', round_views.RoundViewSet)
router.register(r'courses', course_views.CourseViewSet)
router.register(r'tees', tee_views.TeeViewSet)
router.register(r'hole_info', holeinfo_views.HoleInfoViewSet)
router.register(r'hole_scores', holescore_views.HoleScoreViewSet)
router.register(r'groups', base_views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]