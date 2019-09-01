FROM node:10.16-alpine

# Create app directory
WORKDIR /usr/src/app
RUN npm install -g http-server

COPY package.json /usr/src/app

RUN npm install
COPY . /usr/src/app/

EXPOSE 4200
CMD [ "npm", "start" ]