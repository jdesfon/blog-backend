FROM node:12.18-stretch

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

RUN yarn prebuild

RUN yarn build

CMD ["yarn", "start:prod"]