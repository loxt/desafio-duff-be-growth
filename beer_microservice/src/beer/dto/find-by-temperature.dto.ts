import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindByTemperatureDTO {
  @IsNotEmpty()
  @IsNumber()
  temperature: number;
}
