import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Beer } from './beer.entity';
import { Track } from './track.entity';

@Table({
  tableName: 'playlists',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Playlist extends Model {
  @PrimaryKey
  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @HasMany(() => Track, {})
  tracks: [Track];

  @ForeignKey(() => Beer)
  beer: Beer;
}
