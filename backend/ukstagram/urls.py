from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = "ukstagram"

router = DefaultRouter()
router.register("posts", views.PostViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/user_page/", views.user_page),
]
