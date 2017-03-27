FROM node:6.3

MAINTAINER Stan Chollet "stanislas.chollet@gmail.com"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y apt-transport-https

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update
RUN apt-get install -y yarn

COPY package.json /usr/src/app/
COPY .babelrc /usr/src/app/
COPY .nodemon /usr/src/app/

RUN yarn

COPY ./src /usr/src/app/src

RUN ./node_modules/.bin/babel src --out-dir ./dist

EXPOSE 5002
EXPOSE 5003

CMD [ "npm", "start" ]
