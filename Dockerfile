FROM node:20

WORKDIR /usr/app

COPY src .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]