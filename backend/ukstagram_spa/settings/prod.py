from .common import *

# DEBUG = os.environ.get("DEBUG") in ["1", "t", "true", "T", "True"]
DEBUG = False

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(",")

STATICFILES_STORAGE = "ukstagram_spa.storages.StaticAzureStorage"
DEFAULT_FILE_STORAGE = "ukstagram_spa.storages.MediaAzureStorage"

AZURE_ACCOUNT_NAME = os.environ["AZURE_ACCOUNT_NAME"]
AZURE_ACCOUNT_KEY = os.environ["AZURE_ACCOUNT_KEY"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": "ukstagram.postgres.database.azure.com",
        "USER": "cswook96@ukstagram",
        "PASSWORD": os.environ["DB_PASSWORD"],
        "NAME": "postgres",
    }
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"level": "ERROR", "class": "logging.StreamHandler"},
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "ERROR",
        },
    },
}

CORS_ALLOW_ALL_ORIGINS = True
