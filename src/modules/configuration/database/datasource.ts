import { DataSource, DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: +process.env.TYPEORM_PORT,
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'false',
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  logging: process.env.TYPEORM_LOGGING === 'false',
  supportBigNumbers: true,
};

const dataSource = new DataSource(options);

export default dataSource;
