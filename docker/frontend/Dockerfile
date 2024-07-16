FROM node:alpine

WORKDIR /usr/src/app

COPY ../../Frontend/package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY ../../Frontend .

CMD ["ng", "serve", "--host", "0.0.0.0"]
