from rest_framework import permissions, status
from rest_framework.decorators import api_view, action
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .permissions import IsUserOrReadOnly

from .serializers import SignupSerializer, UserSerializer, PasswordChangeSerializer
from django.contrib.auth import get_user_model
import random
from django.db.models import Q


User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsUserOrReadOnly]

    def update(self, request, *args, **kwargs):
        if "avatar" in request.data.keys() and request.data["avatar"] == "null":
            request.data._mutable = True
            request.data["avatar"] = None
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @action(detail=False, methods=["GET"])
    def me(self, request):
        instance = User.objects.get(pk=request.user.pk)
        serializer = self.get_serializer(instance=instance)
        return Response(serializer.data)


class Signup(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


@api_view(["PATCH"])
def password_change(request):
    user = request.user
    serializer = PasswordChangeSerializer(
        data=request.data, context={"request": request}
    )
    serializer.is_valid(raise_exception=True)
    user.set_password(request.data.get("new_password"))
    user.save()
    return Response("비밀번호가 변경되었습니다.", status=status.HTTP_200_OK)


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
        # random.shuffle(qs)
        return qs[:10]


class UserSearchAPI(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()

        username_q = self.request.query_params.get("username", "")
        if username_q:
            qs = User.objects.filter(username__startswith=username_q)
        return qs


@api_view(["POST"])
def user_follow(request):
    follow_username = request.data["username"]
    follow_user = get_object_or_404(User, username=follow_username)
    request.user.following_set.add(follow_user)
    return Response(status=status.HTTP_201_CREATED)


@api_view(["POST"])
def user_unfollow(request):
    unfollow_username = request.data["username"]
    unfollow_user = get_object_or_404(User, username=unfollow_username)
    request.user.following_set.remove(unfollow_user)
    return Response(status=status.HTTP_204_NO_CONTENT)
