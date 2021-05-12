module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URI,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  logging: true,
};
