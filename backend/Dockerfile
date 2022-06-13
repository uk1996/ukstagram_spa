FROM python:3.8.13-buster
WORKDIR /ukstagram/backend
COPY . .
RUN pip install --upgrade pip

RUN pip install -r /ukstagram/backend/requirements/dev.txt
# CMD [ "python","manage.py","runserver"]

CMD python manage.py runserver 0.0.0.0:8000 --settings=ukstagram_spa.settings.prod
