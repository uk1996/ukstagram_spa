from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.utils import timezone
import datetime

from rest_framework.response import Response

from accounts.serializers import UserSerializer
from .models import Post
from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from .pagination import PostPagePagination

User = get_user_model()


class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("author")
        .prefetch_related("tag_set", "like_user_set")
    )
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PostPagePagination

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_queryset(self):
        # timesince = timezone.now() - datetime.timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user)
            | Q(author__in=self.request.user.following_set.all())
        )  # 자신이 작성 했거나, 팔로우한 유저의 포스팅
        # qs = qs.filter(created_at__gte=timesince)  # 3일 이내에 작성한 포스팅

        username_q = self.request.query_params.get("username", "")
        if username_q:
            authors = User.objects.filter(username__startswith=username_q)
            qs = qs.filter(author__in=authors)
        return qs

    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user)
        post.tag_set.add(*post.extract_tag_list())
        post.caption = post.remove_tag_in_caption()
        post.save()

    @action(detail=True, methods=["POST"])
    def like(self, requset, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def user_page(request):
    username = request.data["username"]
    user = get_object_or_404(User, username=username)
    user_serializer = UserSerializer(instance=user)
    postList = Post.objects.filter(author=user)
    postList_serializer = PostSerializer(
        instance=postList, many=True, context={"request": request}
    )
    responseData = {"user": user_serializer.data, "postList": postList_serializer.data}
    return Response(responseData)
