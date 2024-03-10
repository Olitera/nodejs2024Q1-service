import { Module } from '@nestjs/common';
import { ArtistsController } from '../artists/artists.controller';
import { ArtistsService } from '../artists/artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService]
})
export class ArtistsModule {}
