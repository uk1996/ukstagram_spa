from django.urls import path, include
from . import views
from rest_framework_jwt.views import (
    obtain_jwt_token,  # 토큰 획득
    refresh_jwt_token,  # 토큰 갱생
    verify_jwt_token,  # 토근 검증
)
from rest_framework.routers import DefaultRouter

app_name = "accounts"

router = DefaultRouter()
router.register("users", views.UserViewSet)

urlpatterns = [
    path("signup/", views.Signup.as_view(), name="signup"),
    path("<int:pk>/password_change/", views.password_change, name="password_change"),
    path("api-jwt-auth/", obtain_jwt_token),
    path("api-jwt-auth/refresh/", refresh_jwt_token),
    path("api-jwt-auth/verify/", verify_jwt_token),
    path(
        "suggestions/", views.SuggestionAPIView.as_view(), name="suggestion_user_list"
    ),
    path("follow/", views.user_follow, name="user_follow"),
    path("unfollow/", views.user_unfollow, name="user_unfollow"),
    path("", include(router.urls)),
    path("usersearch/", views.UserSearchAPI.as_view(), name="user_search"),
]
