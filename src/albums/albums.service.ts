import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateAlbumDto, Album } from '../interfaces/Albums.interface';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  createAlbum(data: CreateAlbumDto) {
    const album: Album = {
      artistId: data.artistId,
      id: uuidV4(),
      name: data.name,
      year: data.year,
    };
    this.albums.push(album);
    return album;
  }

  getAllAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  updateAlbumInfo(id: string, albumNewInfo: CreateAlbumDto) {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      album.name = albumNewInfo.name;
      album.year = albumNewInfo.year;
      album.artistId = albumNewInfo.artistId;
    }
    return album;
  }

  deleteAlbumById(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      this.albums = this.albums.filter((album) => album.id !== id);
    }
  }

  deleteArtistId(artistId: string) {
    const albums = this.albums.filter((album) => album.artistId === artistId);
    albums.forEach((album) =>
      this.updateAlbumInfo(album.id, {
        artistId: null,
        name: album.name,
        year: album.year,
      }),
    );
  }
}
