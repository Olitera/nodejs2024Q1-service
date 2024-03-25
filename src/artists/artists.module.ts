import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TracksModule, AlbumsModule, PrismaModule],
  exports: [ArtistsService],
})
export class ArtistsModule {}
