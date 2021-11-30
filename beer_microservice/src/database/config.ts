import('dotenv').then((dotenv) => dotenv.config());
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_CONNECTION as any,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // migrations: [`src/database/migrations/*.ts`],
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  migrationsRun: true,
  autoLoadEntities: true,
};

export default TypeOrmConfig;
