import { Injectable } from '@nestjs/common';
import { Artist, CreateArtistDto } from '../interfaces/artists.interface';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  createArtist(data: CreateArtistDto) {
    const artist: Artist = {
      grammy: data.grammy,
      id: uuidV4(),
      name: data.name,
    };
    this.artists.push(artist);
    return artist;
  }

  getAllArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  updateArtistInfo(id: string, artistNewInfo: CreateArtistDto) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      artist.name = artistNewInfo.name;
      artist.grammy = artistNewInfo.grammy;
    }
    return artist;
  }

  deleteArtistById(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      this.artists = this.artists.filter((artist) => artist.id !== id);
    }
  }
}
