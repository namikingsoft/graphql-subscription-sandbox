const {
  DATABASE_URI,
  RDS_HOSTNAME,
  RDS_PORT,
  RDS_DB_NAME,
  RDS_USERNAME,
  RDS_PASSWORD,
} = process.env;

module.exports = {
  type: 'postgres',
  url:
    DATABASE_URI ||
    `postgres://${RDS_USERNAME}:${RDS_PASSWORD}@${RDS_HOSTNAME}:${RDS_PORT}/${RDS_DB_NAME}`,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  logging: true,
};
