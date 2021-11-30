import { Body, Controller } from '@nestjs/common';
import { BeerService } from './beer.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('beers')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @MessagePattern('create')
  create(@Body() createBeerDto) {
    return this.beerService.create(createBeerDto);
  }

  @MessagePattern('findAll')
  findAll() {
    return this.beerService.findAll();
  }

  @MessagePattern('findOne')
  findOne(@Body('id') id: string) {
    return this.beerService.findOne(id);
  }

  @MessagePattern('findByTemperature')
  findByTemperature(@Body() temperature: number) {
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
