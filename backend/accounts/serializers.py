from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["pk", "username", "avatar_url"]


class UserSerializer(serializers.ModelSerializer):
    following_set = FollowSerializer(many=True, read_only=True)
    follower_set = FollowSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "pk",
            "username",
            "avatar",
            "avatar_url",
            "following_set",
            "follower_set",
            "introduction",
            "first_name",
            "last_name",
            "email",
            "website_url",
            "phone_number",
        ]


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = ["pk", "username", "password"]
