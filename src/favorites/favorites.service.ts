import { Injectable } from '@nestjs/common';
import {
  Favorites,
  FavoritesResponse,
} from '../interfaces/favorites.interface';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(
    private trackService: TracksService,
    private albumService: AlbumsService,
    private artistService: ArtistsService,
  ) {}

  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

   async getAllFavorites() {
     const favorites: FavoritesResponse = {
      albums: await Promise.all(this.favorites.albums
        .map(async (id) => await this.albumService.getAlbumById(id))
        .filter((el) => el)),
      artists: await Promise.all(this.favorites.artists
        .map(async (id) =>  await this.artistService.getArtistById(id))
        .filter((el) => el)),
      tracks: this.favorites.tracks
        .map((id) => this.trackService.getTrackById(id))
        .filter((el) => el),
    };

    return favorites;
  }

  addTrackToFavs(trackId: string) {
    this.favorites.tracks.push(trackId);
    return;
  }

  deleteTrackToFavs(trackId: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== trackId,
    );
  }

  isTrackInFavs(trackId: string) {
    return !!this.favorites.tracks.find((id) => id === trackId);
  }

  addAlbumToFavs(albumId: string) {
    this.favorites.albums.push(albumId);
    return;
  }

  deleteAlbumFromFavs(albumId: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== albumId,
    );
  }

  isAlbumInFavs(albumId: string) {
    return !!this.favorites.albums.find((id) => id === albumId);
  }

  addArtistToFavs(artistId: string) {
    this.favorites.artists.push(artistId);
    return;
  }

  deleteArtistFromFavs(artistId: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artistId,
    );
  }

  isArtistInFavs(artistId: string) {
    return !!this.favorites.artists.find((id) => id === artistId);
  }
}
