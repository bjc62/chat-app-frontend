FROM alpine:latest

RUN apk add --update nodejs npm

WORKDIR /chat-app-frontned

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
