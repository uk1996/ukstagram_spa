from rest_framework import permissions
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import SignupSerializer, SuggestionSerializer
from django.contrib.auth import get_user_model
import random


class Signup(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [
        permissions.AllowAny,
    ]


User = get_user_model()


class SuggestionAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = SuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset().exclude(username=self.request.user)
        qs = list(qs)
        random.shuffle(qs)
        return qs
