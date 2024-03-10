import { Module } from '@nestjs/common';
import { ArtistsController } from '../artists/artists.controller';
import { ArtistsService } from '../artists/artists.service';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TracksModule]
})
export class ArtistsModule {}
