import { Playlist } from './playlist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tracks',
})
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  link: string;

  @Column({ nullable: false })
  artist: string;

  @ManyToOne(() => Playlist)
  playlist: Playlist;
}
