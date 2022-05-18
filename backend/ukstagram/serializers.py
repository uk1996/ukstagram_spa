from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post, Tag

User = get_user_model()


class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["pk", "username", "name", "avatar_url"]


class LikeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["pk", "username"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["pk", "name"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthSerializer(read_only=True)
    # tag_set = TagSerializer(many=True)
    # like_user_set = LikeUserSerializer(many=True)

    class Meta:
        model = Post
        fields = [
            "pk",
            "created_at",
            "updated_at",
            "author",
            # "tag_set",
            "photo",
            "caption",
            "location",
            # "like_user_set",
        ]
