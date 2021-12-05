import { HttpException, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { catchError, of } from 'rxjs';

@Injectable()
export class BeerService {
  private microserviceClient: ClientProxy;

  constructor() {
    this.microserviceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.BEER_MICROSERVICE_HOST,
        port: +process.env.BEER_MICROSERVICE_PORT,
      },
    });
  }

  async create(createBeerDto: any = {}) {
    return this.microserviceClient
      .send('create', createBeerDto)
      .pipe(catchError((error) => of(error)));
  }

  async findAll() {
    return this.microserviceClient.send('findAll', []);
  }

  async findOne(id: string) {
    return this.microserviceClient.send('findOne', {
      id,
    });
  }

  async findByTemperature(temperature: number) {
    if (temperature === null) {
      throw new HttpException('Temperature field is not defined', 400);
    }
    return this.microserviceClient
      .send('findByTemperature', temperature)
      .pipe(catchError((error) => of(error)));
  }

  update(id: number, updateBeerDto: any) {
    return `This action updates a #${id} beer`;
  }

  remove(id: number) {
    return `This action removes a #${id} beer`;
  }
}
