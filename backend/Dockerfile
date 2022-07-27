FROM python:3.8.13-buster
WORKDIR /ukstagram

RUN apt-get update && apt-get clean
RUN pip install --upgrade pip

#COPY . .
ADD . /ukstagram
RUN pip install -r /ukstagram/requirements/prod.txt

ENV PYTHONUNBUFFERED=1
#ENV AZURE_ACCOUNT_NAME=
#ENV AZURE_ACCOUNT_KEY=
#ENV DJNAGO_SETTINGS_MODULE=

EXPOSE 80
#CMD python manage.py runserver 0.0.0.0:8000
CMD ["gunicorn", "ukstagram_spa.wsgi:application", "--bind", "0.0.0.0:80"]