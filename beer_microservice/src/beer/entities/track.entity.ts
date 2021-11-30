import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Beer } from './beer.entity';
import { Playlist } from './playlist.entity';

@Table({
  tableName: 'tracks',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Track extends Model {
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
  link: string;

  @Column({ allowNull: false })
  artist: string;

  @BelongsTo(() => Beer, 'playlistId')
  beer: Beer;

  @ForeignKey(() => Playlist)
  playlist: Playlist;
}
