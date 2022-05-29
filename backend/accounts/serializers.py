from rest_framework import serializers, status
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

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
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)

    def validate_password_confirm(self, value):
        password = self.context["request"].data.get("password")
        if password != value:
            raise ValidationError("두 비밀번호가 일치하지 않습니다.")
        return value

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            introduction=validated_data["introduction"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = ["pk", "username", "password", "password_confirm", "introduction"]


class PasswordChangeSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    new_password_confirm = serializers.CharField(write_only=True, required=True)

    def validate_old_password(self, value):
        user = self.context["user"]
        if user.check_password(value) == False:
            raise ValidationError("현재 비밀번호가 일치하지 않습니다.")
        return value

    def validate_new_password(self, value):
        user = self.context["user"]
        if user.check_password(value) == True:
            raise ValidationError("새로운 비밀번호와 기존의 비밀번호가 일치합니다.")
        return value

    def validate_new_password_confirm(self, value):
        new_password = self.context["request"].data.get("new_password")
        if new_password != value:
            raise ValidationError("새로운 두 비밀번호가 일치하지 않습니다.")
        return value

    class Meta:
        model = User
        fields = ["pk", "old_password", "new_password", "new_password_confirm"]
