# FROM ubuntu:20.04
FROM python:3.8.13-slim-buster
# RUN apt update && apt install -y python3.8
WORKDIR /ukstagram/backend
COPY . .
RUN pip install --upgrade pip

RUN pip install -r /ukstagram/backend/requirements/dev.txt
# CMD [ "python","manage.py","runserver"]

CMD python manage.py runserver 0.0.0.0:8000 --settings=ukstagram_spa.settings.prod