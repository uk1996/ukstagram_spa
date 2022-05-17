from rest_framework import permissions, status
from rest_framework.decorators import api_view, action
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import SignupSerializer, UserSerializer
from django.contrib.auth import get_user_model
import random
from django.db.models import Q


User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=["GET"])
    def me(self, request):
        instance = User.objects.get(pk=request.user.pk)
        serializer = self.get_serializer(instance=instance)
        return Response(serializer.data)


class Signup(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]


class SuggestionAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = (
            super()
            .get_queryset()
            .exclude(
                Q(pk__in=self.request.user.following_set.all())
                | Q(pk=self.request.user.pk)
            )
        )
        qs = list(qs)
        random.shuffle(qs)
        return qs


@api_view(["POST"])
def user_follow(request):
    follow_username = request.data["username"]
    follow_user = get_object_or_404(User, username=follow_username)
    request.user.following_set.add(follow_user)
    return Response(status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def user_unfollow(request):
    unfollow_username = request.data["username"]
    unfollow_user = get_object_or_404(User, username=unfollow_username)
    request.user.following_set.remove(unfollow_user)
    return Response(status.HTTP_204_NO_CONTENT)
