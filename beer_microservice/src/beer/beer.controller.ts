import { Controller } from '@nestjs/common';
import { BeerService } from './beer.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBeerDto } from './dto/create-beer.dto';

@Controller('beers')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @MessagePattern('create')
  async create(createBeerDto: CreateBeerDto) {
    return this.beerService.create(createBeerDto);
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
  findByTemperature(temperature) {
    return this.beerService.findByTemperature(temperature);
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
