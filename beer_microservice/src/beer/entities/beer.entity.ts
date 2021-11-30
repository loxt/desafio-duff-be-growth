import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BeerStyle } from '../types/beer.type';
import { Playlist } from './playlist.entity';

@Table({
  tableName: 'beers',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Beer extends Model {
  @PrimaryKey
  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  minimum_temperature: number;

  @Column({ allowNull: false })
  maximum_temperature: number;

  @Column({ allowNull: false })
  average_temperature: number;

  @Column({ allowNull: false })
  style: BeerStyle;

  @HasOne(() => Playlist)
  playlist: Playlist;

  @BeforeCreate
  @BeforeUpdate
  static beforeCreateBeer(beer, options, cb) {
    console.log('fds');
    beer.average_temperature =
      (beer.maximum_temperature + beer.minimum_temperature) / 2;
  }
}
