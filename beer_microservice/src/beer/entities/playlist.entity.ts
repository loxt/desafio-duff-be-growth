import { Track } from './track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'playlists',
})
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Track, (trackEntity) => trackEntity.playlist, {
    cascade: true,
  })
  tracks: [Track];
}
