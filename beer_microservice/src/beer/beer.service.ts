import { Injectable, Logger } from '@nestjs/common';
import { Beer } from './entities/beer.entity';
import { CreateBeerDto } from './dto/create-beer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { validateOrReject } from 'class-validator';

@Injectable()
export class BeerService {
  constructor(
    @InjectRepository(Beer) private readonly beerRepository: Repository<Beer>,
  ) {}

  logger: Logger = new Logger('BeerService');

  async create(createBeerDto: CreateBeerDto) {
    const beer = new Beer();
    Object.assign(beer, createBeerDto);

    await validateOrReject(beer);
    return this.beerRepository.save(beer);
  }

  findAll() {
    return this.beerRepository.find();
  }

  findOne(id: string) {
    return this.beerRepository.findOneOrFail(id);
  }

  async findByTemperature(temperature: number) {
    if (temperature === null) {
      throw new RpcException({
        statusCode: 400,
        error: 'Temperature field is not defined',
      });
    }
    const beers = await this.beerRepository.query(
      `SELECT *
       from beers
       order by abs(average_temperature - ${temperature}), style ASC`,
    );

    this.logger.log(`Found ${beers.length} beers for the closest value of 36`);

    return beers.filter(
      (beer) =>
        beer.name[0] === beers[0].name[0] &&
        beer.average_temperature === beers[0].average_temperature,
    );
  }

  // update(id: number, updateBeerDto: UpdateBeerDto) {
  //   return `This action updates a #${id} beer`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} beer`;
  // }
}
