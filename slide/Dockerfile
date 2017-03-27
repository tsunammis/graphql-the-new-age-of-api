FROM python:3.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 5000

CMD ["python3", "-m", "http.server", "5000"]
