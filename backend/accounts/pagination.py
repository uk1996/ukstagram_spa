from rest_framework.pagination import PageNumberPagination


class UserSerarchPagination(PageNumberPagination):
    page_size = 5
