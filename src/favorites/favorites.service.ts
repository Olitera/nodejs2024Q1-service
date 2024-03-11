import { Injectable } from '@nestjs/common';
import { Favorites, FavoritesResponse } from '../interfaces/favorites.interface';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(
    private trackService: TracksService,
    private albumService: AlbumsService,
    private artistService: ArtistsService
  ) {}

  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: []
  };

  getAllFavorites() {
    const favorites: FavoritesResponse = {
      albums: this.favorites.albums.map((id)=> this.albumService.getAlbumById(id)),
      artists: this.favorites.artists.map((id) => this.artistService.getArtistById(id)),
      tracks: this.favorites.tracks.map((id) => this.trackService.getTrackById(id))
    }
    return favorites
  }

  addTrackToFavs(trackId: string) {
    this.favorites.tracks.push(trackId);
    return
  }

  deleteTrackTofavs(trackId: string) {
    const track = this.trackService.getTrackById(trackId);
    if (track) {
      this.favorites.tracks = this.favorites.tracks.filter((id) => id !== trackId)
    }
  }
}
