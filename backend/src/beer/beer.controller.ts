import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BeerService } from './beer.service';

@Controller('beers')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  private readonly logger: Logger = new Logger('BeerController');

  @Post()
  async create(@Body() createBeerDto: any) {
    return this.beerService.create(createBeerDto);
  }

  @Get()
  findAll() {
    return this.beerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beerService.findOne(id);
  }

  @Get('temperature')
  async findByTemperature(@Body('temperature') temperature: number) {
    return this.beerService.findByTemperature(+temperature);
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
