module.exports = {
  type: 'postgres',
  url:
    process.env.DATABASE_URI ||
    'postgres://postgres:postgres@localhost:5432/postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  logging: true,
};
