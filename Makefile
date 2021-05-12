up-middleware:
	docker-compose -f docker-compose.middleware.yml up -d

down-middleware:
	docker-compose -f docker-compose.middleware.yml down -v

psql:
	docker-compose -f docker-compose.middleware.yml \
	  exec database psql "postgres://postgres:postgres@database:5432/postgres"

.PHONY: src/client/lib/api.ts
src/client/lib/api.ts:
	npx graphql-codegen --config $(CURDIR)/gqlcodegen.yml

