from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = "ukstagram"

router = DefaultRouter()
router.register("posts", views.PostViewSet)
router.register(r"posts/(?P<post_pk>\d+)/comments", views.CommentViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/user_page/", views.user_page),
]
