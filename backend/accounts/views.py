from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from .serializers import SignupSerializer


class Signup(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [
        permissions.AllowAny,
    ]


signup = Signup.as_view()
