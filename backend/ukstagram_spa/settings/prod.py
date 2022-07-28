from .common import *
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

# DEBUG = os.environ.get("DEBUG") in ["1", "t", "true", "T", "True"]
DEBUG = False

sentry_sdk.init(
    dsn="https://a376d6a1c53d44239c13bad4807b0de5@o1337312.ingest.sentry.io/6606892",
    integrations=[
        DjangoIntegration(),
    ],
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,
    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True,
)

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

CSRF_TRUSTED_ORIGINS = ["https://ukstagram.azurewebsites.net"]
