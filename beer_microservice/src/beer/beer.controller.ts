import { Controller } from '@nestjs/common';
import { BeerService } from './beer.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBeerDTO } from './dto/create-beer.dto';
import { FindByTemperatureDTO } from './dto/find-by-temperature.dto';

@Controller('beers')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @MessagePattern('create')
  async create(createBeerDTO: CreateBeerDTO) {
    return this.beerService.create(createBeerDTO);
  }

  @MessagePattern('findAll')
  findAll() {
    return this.beerService.findAll();
  }

  @MessagePattern('findOne')
  findOne({ id }) {
    return this.beerService.findOne(id);
  }

  @MessagePattern('findByTemperature')
  findByTemperature(findByTemperatureDTO: FindByTemperatureDTO) {
    return this.beerService.findByTemperature(findByTemperatureDTO);
  }

  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerDto) {
  //   return this.beerService.update(+id, updateBeerDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.beerService.remove(+id);
  // }
}
