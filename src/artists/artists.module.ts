import { Module } from '@nestjs/common';
import { ArtistsController } from '../artists/artists.controller';
import { ArtistsService } from '../artists/artists.service';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TracksModule, AlbumsModule],
  exports: [ArtistsService]
})
export class ArtistsModule {}
