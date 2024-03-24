import { Injectable } from '@nestjs/common';
import { Favorites, } from '../interfaces/favorites.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private prisma: PrismaService,
  ) {
    this.prisma.favorites.create({ data: this.favorites });
  }

  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  async getAllFavorites() {
    const favorites = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    return {
      albums: await this.prisma.album.findMany({ where: { id: { in: favorites.albums } } }),
      artists: await this.prisma.artist.findMany({ where: { id: { in: favorites.artists } } }),
      tracks: await this.prisma.track.findMany({ where: { id: { in: favorites.tracks } } }),
    };
  }

  async addTrackToFavs(trackId: string) {
    const favorites = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    if (!favorites?.tracks) {
    } else {
      let tracks = favorites.tracks;
      if (!tracks.includes(trackId)) {
        await this.prisma.favorites.update({
          data: { tracks: { push: trackId } },
          where: { id: 1 }
        });
        return this.prisma.track.findUnique({ where: { id: trackId } });
      }
    }
  }

  async deleteTrackToFavs(trackId: string) {
    const favs = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    const tracks = favs.tracks.filter((id) => id !== trackId);
    await this.prisma.favorites.update({
      data: { tracks },
      where: { id: 1 }
    });
  }

  async isTrackInFavs(trackId: string) {
    const favs = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    return favs.tracks.includes(trackId);
  }

  async addAlbumToFavs(albumId: string) {
    const favorites = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    if (!favorites?.albums) {
    } else {
      let albums = favorites.albums;
      if ( !albums.includes(albumId)) {
        await this.prisma.favorites.update({
          data: { albums: { push: albumId } },
          where: { id: 1 }
        });
        return this.prisma.album.findUnique({ where: { id: albumId } });
      }
    }
  }

  async deleteAlbumFromFavs(albumId: string) {
    const favs = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    const albums = favs.albums.filter((id) => id !== albumId);
    await this.prisma.favorites.update({
      data: { albums },
      where: { id: 1 }
    });
  }

  async isAlbumInFavs(albumId: string) {
    const favorites = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    return favorites.albums.includes(albumId);
  }

  async addArtistToFavs(artistId: string) {
    const favorites = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    if (!favorites?.artists) {
    } else {
      let artists = favorites.artists;
      if (!artists.includes(artistId)) {
        await this.prisma.favorites.update({
          data: { artists: { push: artistId } },
          where: { id: 1 }
        });
        return this.prisma.artist.findUnique({ where: { id: artistId } });
      }
    }
  }

  async deleteArtistFromFavs(artistId: string) {
    const favs = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    const artists = favs.artists.filter((id) => id !== artistId);
    await this.prisma.favorites.update({
      data: { artists },
      where: { id: 1 }
    });
  }

  async isArtistInFavs(artistId: string) {
    const favorites = await this.prisma.favorites.findUnique({ where: { id: 1 } });
    return favorites.artists.includes(artistId);
  }
}
