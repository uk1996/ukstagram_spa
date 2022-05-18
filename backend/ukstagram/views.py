from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
import datetime
from .models import Post
from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("author")
        .prefetch_related("tag_set", "like_user_set")
    )
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # timesince = timezone.now() - datetime.timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user)
            | Q(author__in=self.request.user.following_set.all())
        )  # 자신이 작성 했거나, 팔로우한 유저의 포스팅
        # qs = qs.filter(created_at__gte=timesince)  # 3일 이내에 작성한 포스팅
        return qs
