FROM node:18-alpine as transpilation

WORKDIR /transpile

COPY . .

RUN yarn

RUN yarn tsc

#stage 2

FROM  node:18-alpine

WORKDIR /app

COPY --from=transpilation /transpile/dist  ./dist

COPY public ./public

COPY .env .

COPY package.json .

COPY bin ./bin

COPY views ./views

RUN yarn --prod

COPY yarn.lock .

CMD [ "node", "bin/www" ]

EXPOSE 3005