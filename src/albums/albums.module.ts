import { Module } from '@nestjs/common';
import { AlbumsController } from '../albums/albums.controller';
import { AlbumsService } from '../albums/albums.service';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [TracksModule]
})
export class AlbumsModule {}
