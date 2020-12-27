FROM node:current-slim

WORKDIR /usr/investigationDeleteService

COPY ./dist ./
COPY ./package.json ./

RUN npm install --production

CMD ["npm", "run", "deploy"]