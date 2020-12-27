FROM node:current-slim

WORKDIR /usr/investigationDeleteService

COPY ./dist ./
COPY ./package.json ./

RUN npm install --only=prod

CMD ["npm", "run", "deploy"]