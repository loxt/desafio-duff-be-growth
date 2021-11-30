import { Module } from '@nestjs/common';
import { BeerService } from './beer.service';
import { BeerController } from './beer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Beer } from './entities/beer.entity';
import { Playlist } from './entities/playlist.entity';
import { Track } from './entities/track.entity';

@Module({
  imports: [SequelizeModule.forFeature([Beer, Playlist, Track])],
  controllers: [BeerController],
  providers: [BeerService],
})
export class BeerModule {}
