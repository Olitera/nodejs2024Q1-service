import { Module } from '@nestjs/common';
import { FavoritesController } from '../favorites/favorites.controller';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [AlbumsModule, ArtistsModule, TracksModule],
  exports: [FavoritesService]
})
export class FavoritesModule {}
