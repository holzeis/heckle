FROM node:10.16-alpine

# Create app directory
WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm install
COPY . /usr/src/app/

EXPOSE 3000
EXPOSE 2000

CMD [ "npm", "start" ]