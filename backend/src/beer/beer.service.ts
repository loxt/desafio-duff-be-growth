import { HttpException, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { catchError, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as querystring from 'querystring';

@Injectable()
export class BeerService {
  private microserviceClient: ClientProxy;

  constructor(private readonly httpService: HttpService) {
    this.microserviceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.BEER_MICROSERVICE_HOST,
        port: +process.env.BEER_MICROSERVICE_PORT,
      },
    });
  }

  async create(createBeerDto: any = {}) {
    this.httpService
      .post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({ grant_type: 'client_credentials' }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: process.env.SPOTIFY_CLIENT_ID,
            password: process.env.SPOTIFY_CLIENT_SECRET,
          },
        },
      )
      .subscribe((c) => console.log(c));
    return 'ok';
    // return this.microserviceClient
    //   .send('create', createBeerDto)
    //   .pipe(catchError((error) => of(error)));
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
      .send('findByTemperature', { temperature })
      .pipe(catchError((error) => of(error)));
  }

  update(id: number, updateBeerDto: any) {
    return `This action updates a #${id} beer`;
  }

  remove(id: number) {
    return `This action removes a #${id} beer`;
  }
}
