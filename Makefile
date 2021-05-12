DATABASE_URI ?= postgres://postgres:postgres@localhost:5432/postgres

up-middleware:
	docker-compose -f docker-compose.middleware.yml up -d

down-middleware:
	docker-compose -f docker-compose.middleware.yml down -v

psql:
	docker-compose -f docker-compose.middleware.yml \
	  exec database psql "$(DATABASE_URI)"

.PHONY: src/client/lib/api.ts
src/client/lib/api.ts:
	npx graphql-codegen --config $(CURDIR)/gqlcodegen.yml
