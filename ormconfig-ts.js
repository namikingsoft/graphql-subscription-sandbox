// eslint-disable-next-line @typescript-eslint/no-var-requires
const original = require('./ormconfig');

module.exports = {
  ...original,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
};
