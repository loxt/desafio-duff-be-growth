import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Beer } from './entities/beer.entity';
import { Sequelize } from 'sequelize-typescript';
import { CreateBeerDto } from './dto/create-beer.dto';
import { BeerStyle } from './types/beer.type';
import { Playlist } from './entities/playlist.entity';
import { Track } from './entities/track.entity';

@Injectable()
export class BeerService {
  constructor(
    @InjectModel(Beer) private readonly beerModel: typeof Beer,
    private readonly sequelize: Sequelize,
  ) {}

  logger: Logger = new Logger('BeerService');

  async create(createBeerDto: CreateBeerDto) {
    const beer = {
      ...createBeerDto,
      style: BeerStyle.DUNKEL,
      average_temperature: 0,
      playlist: {
        name: 'teste',
        link: 'http',
      },
    };
    const tst = await this.beerModel.create(beer, {
      include: [
        {
          all: true,
        },
      ],
    });
    console.log(beer);
    console.debug(tst);
    return 'oi';
  }

  findAll() {
    return this.beerModel.findAll();
  }

  findOne(id: string) {
    console.log(id);
    return this.beerModel.findByPk(id, {
      include: [Playlist, Track],
    });
  }

  async findByTemperature(temperature: number) {
    const [beers] = await this.sequelize.query(
      `SELECT *
       from beers
       order by abs(average_temperature - ${temperature}), style ASC`,
    );

    this.logger.log(`Found ${beers.length} beers for the closest value of 36`);
    return beers;
  }

  // update(id: number, updateBeerDto: UpdateBeerDto) {
  //   return `This action updates a #${id} beer`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} beer`;
  // }
}
