import { HttpException, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class BeerService {
  private microserviceClient: ClientProxy;

  constructor() {
    this.microserviceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'beer_microservice',
        port: 8081,
      },
    });
  }

  async create(createBeerDto: any = {}) {
    return this.microserviceClient.send('create', createBeerDto);
  }

  findAll() {
    return this.microserviceClient.send('findAll', []);
  }

  findOne(id: string) {
    return this.microserviceClient.send('findOne', {
      id,
    });
  }

  findByTemperature(temperature: number) {
    console.log(temperature);
    if (temperature === null) {
      throw new HttpException('Temperature field is not defined', 400);
    }
    console.log('essa é a temp', temperature);
    return this.microserviceClient.send('findByTemperature', temperature);
  }

  update(id: number, updateBeerDto: any) {
    return `This action updates a #${id} beer`;
  }

  remove(id: number) {
    return `This action removes a #${id} beer`;
  }
}
