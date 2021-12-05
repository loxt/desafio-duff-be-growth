import { BeerStyle } from '../types/beer.type';
import { Playlist } from './playlist.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'beers',
})
export class Beer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  minimum_temperature: number;

  @Column({ nullable: false })
  maximum_temperature: number;

  @Column({ nullable: false })
  average_temperature: number;

  @Column({ nullable: false })
  style: BeerStyle;

  @OneToOne(() => Playlist)
  playlist: Playlist;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeCreate() {
    this.average_temperature =
      (this.maximum_temperature + this.minimum_temperature) / 2;
  }
}
