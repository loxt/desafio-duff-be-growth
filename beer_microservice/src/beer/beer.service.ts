import { Injectable, Logger } from '@nestjs/common';
import { Beer } from './entities/beer.entity';
import { CreateBeerDTO } from './dto/create-beer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindByTemperatureDTO } from './dto/find-by-temperature.dto';

@Injectable()
export class BeerService {
  constructor(
    @InjectRepository(Beer) private readonly beerRepository: Repository<Beer>,
  ) {}

  logger: Logger = new Logger('BeerService');

  async create(createBeerDTO: CreateBeerDTO) {
    const beer = new Beer();
    Object.assign(beer, createBeerDTO);

    return this.beerRepository.save(beer);
  }

  findAll() {
    return this.beerRepository.find({
      relations: ['playlist', 'playlist.tracks'],
    });
  }

  findOne(id: string) {
    return this.beerRepository.findOneOrFail(id);
  }

  async findByTemperature(findByTemperatureDTO: FindByTemperatureDTO) {
    const beers = await this.beerRepository.query(
      `SELECT *
       from beers
       order by abs(average_temperature - ${findByTemperatureDTO.temperature}), style ASC`,
    );

    this.logger.log(`Found ${beers.length} beers for the closest value of 36`);

    return beers.filter(
      (beer) =>
        beer.style[0] === beers[0].style[0] &&
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
