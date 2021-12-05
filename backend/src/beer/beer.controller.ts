import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BeerService } from './beer.service';

@Controller('beers')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Post()
  async create(@Body() createBeerDto: any) {
    return this.beerService.create(createBeerDto);
  }

  @Get()
  findAll() {
    return this.beerService.findAll();
  }

  @Get('temperature')
  async findByTemperature(@Body('temperature') temperature: number) {
    return this.beerService.findByTemperature(+temperature);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeerDto: any) {
    return this.beerService.update(+id, updateBeerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beerService.remove(+id);
  }
}
