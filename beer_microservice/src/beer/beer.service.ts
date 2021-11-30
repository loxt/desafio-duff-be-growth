import { Injectable, Logger } from '@nestjs/common';
import { Beer } from './entities/beer.entity';
import { CreateBeerDto } from './dto/create-beer.dto';
import { BeerStyle } from './types/beer.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BeerService {
  constructor(
    @InjectRepository(Beer) private readonly beerRepository: Repository<Beer>,
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
    const tst = await this.beerRepository.create(beer);

    console.log('foi');
    console.log(tst);
    return 'oi';
  }

  findAll() {
    return this.beerRepository.find();
  }

  findOne(id: string) {
    return this.beerRepository.findOneOrFail(id);
  }

  async findByTemperature(temperature: number) {
    const [beers] = await this.beerRepository.query(
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
