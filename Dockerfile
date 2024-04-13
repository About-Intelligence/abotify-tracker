FROM python:3.9

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip

RUN pip install --trusted-host pypi.python.org -r requirements.txt

RUN apt-get update

RUN apt-get install -y wget unzip

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

RUN apt install -y ./google-chrome-stable_current_amd64.deb

RUN rm google-chrome-stable_current_amd64.deb

RUN apt-get clean
