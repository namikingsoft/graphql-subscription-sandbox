# Sandbox of GraphQL subscription

Powered by [Nest](https://github.com/nestjs/nest) on AWS Beanstalk.

![subscription](https://user-images.githubusercontent.com/3187220/118215790-3830db80-b4ad-11eb-8b68-00578bc6c3c0.png)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# export env
# $ cp .env.template .env
# $ export $(cat .env | grep -v '^#' | grep -v '^$' | xargs)

# run middlewares on docker
$ make up-middleware

# migrate database
$ npm run migration:run

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deploy to AWS

Install awscli and ebcli.

```bash
# export aws keypar
$ export AWS_ACCESS_KEY_ID="xxxx"
$ export AWS_SECRET_ACCESS_KEY="yyyy"
$ export AWS_DEFAULT_REGION="ap-northeast-1"

# Create resources and deploy to AWS
$ make create

# Deploy only
$ make deploy

# Scale out
$ eb scale 3
```

## Test

```bash
# load testing senario via websocket
$ npx artillery run senarios/websocket.yml

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
