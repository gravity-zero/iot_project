# syntax=docker/dockerfile:1

FROM node:14.5.0-alpine3.10

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]
