import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BeerModule } from './beer/beer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BeerModule,
  ],
})
export class AppModule {}
