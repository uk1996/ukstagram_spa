from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post, Tag, Comment

User = get_user_model()


class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["pk", "username", "name", "avatar", "avatar_url"]


# class LikeUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["pk", "username"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["pk", "name"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthSerializer(read_only=True)
    tag_set = TagSerializer(many=True, read_only=True)
    # like_user_set = LikeUserSerializer(many=True, read_only=True)
    is_like = serializers.SerializerMethodField("is_like_field")

    def is_like_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = Post
        fields = [
            "pk",
            "created_at",
            "updated_at",
            "author",
            "tag_set",
            "photo",
            "caption",
            "location",
            # "like_user_set",
            "is_like",
        ]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
