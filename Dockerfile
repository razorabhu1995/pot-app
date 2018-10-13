FROM node:8-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

# for dev mode
# COPY .env.local ./

CMD npm run serve

# document port
EXPOSE 8080