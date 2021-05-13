DATABASE_URI ?= postgres://postgres:postgres@localhost:5432/postgres

all: src/client/lib/api.ts

up-middleware:
	docker-compose -f docker-compose.middleware.yml up -d

down-middleware:
	docker-compose -f docker-compose.middleware.yml down -v

psql:
	docker-compose -f docker-compose.middleware.yml \
	  exec database psql "$(DATABASE_URI)"

create:
	rm -f .elasticbeanstalk/config.yml
	eb init \
	  --region ap-northeast-1 \
	  --platform "Docker running on 64bit Amazon Linux 2"
	eb create \
	  --database \
	  --database.engine postgres \
	  --elb-type application

deploy:
	eb deploy

terminate:
	eb terminate

.PHONY: src/client/lib/api.ts
src/client/lib/api.ts:
	npx graphql-codegen --config $(CURDIR)/gqlcodegen.yml
