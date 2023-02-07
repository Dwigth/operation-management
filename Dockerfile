FROM node:19.3.0-alpine

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

RUN npx nx run migration-runner:build
RUN npx nx run operation-app:build
RUN npx nx run operation-backend:build

CMD ["node", "dist/apps/operation-backend"]