from django.urls import path
from . import views
from rest_framework_jwt.views import (
    obtain_jwt_token,  # 토큰 획득
    refresh_jwt_token,  # 토큰 갱생
    verify_jwt_token,  # 토근 검증
)

app_name = "accounts"

urlpatterns = [
    path("signup/", views.Signup.as_view(), name="signup"),
    path("api-jwt-auth/", obtain_jwt_token),
    path("api-jwt-auth/refresh/", refresh_jwt_token),
    path("api-jwt-auth/verify/", verify_jwt_token),
    path(
        "suggestions/", views.SuggestionAPIView.as_view(), name="suggestion_user_list"
    ),
    path("follow/", views.user_follow, name="user_follow"),
    path("unfollow/", views.user_unfollow, name="user_unfollow"),
]
