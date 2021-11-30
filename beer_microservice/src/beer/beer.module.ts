import { Module } from '@nestjs/common';
import { BeerService } from './beer.service';
import { BeerController } from './beer.controller';
import { Beer } from './entities/beer.entity';
import { Playlist } from './entities/playlist.entity';
import { Track } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Beer, Playlist, Track])],
  controllers: [BeerController],
  providers: [BeerService],
})
export class BeerModule {}
