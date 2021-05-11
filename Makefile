.PHONY: src/client/lib/api.ts
src/client/lib/api.ts:
	npx graphql-codegen --config $(CURDIR)/gqlcodegen.yml

psql:
	docker-compose exec database psql "postgresql://postgres:postgres@database:5432/postgres"
