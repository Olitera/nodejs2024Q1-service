import { Artist } from '../interfaces/artists.interface';
import { Album } from '../interfaces/albums.interface';
import { Track } from '../interfaces/tracks.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
