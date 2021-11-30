import { BeerStyle, BeerStyleList } from '../types/beer.type';
import { Playlist } from '../entities/playlist.entity';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBeerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsIn(BeerStyleList)
  style: BeerStyle;

  @IsNotEmpty()
  @IsNumber()
  minimum_temperature: number;

  @IsNotEmpty()
  @IsNumber()
  max_temperature: number;

  playlist: Playlist;
}
