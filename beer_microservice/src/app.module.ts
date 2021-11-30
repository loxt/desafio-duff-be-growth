import { Module } from '@nestjs/common';
import { BeerModule } from './beer/beer.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
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
    }),
    BeerModule,
  ],
})
export class AppModule {}
