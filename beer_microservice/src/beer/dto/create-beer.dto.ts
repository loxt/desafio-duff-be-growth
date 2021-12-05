import { BeerStyle, BeerStyleList } from '../types/beer.type';
import { Playlist } from '../entities/playlist.entity';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateBeerDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Expose()
  @IsString()
  @IsIn(BeerStyleList)
  style: BeerStyle;

  @IsNotEmpty()
  @IsNumber()
  minimum_temperature: number;

  @IsNotEmpty()
  @IsNumber()
  maximum_temperature: number;

  playlist: Playlist;
}
