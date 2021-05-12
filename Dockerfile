#syntax = docker/dockerfile:1.2

FROM node:14-alpine
WORKDIR /app
COPY package*.json .
RUN \
  --mount=type=cache,target=/root/.npm \
  npm ci
COPY . .
RUN npm run build
CMD ["npm", "run" "start:prod"]
EXPOSE 3000
