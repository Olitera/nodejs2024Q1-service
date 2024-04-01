import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateAlbumDto } from '../interfaces/albums.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async createAlbum(data: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: {
        artistId: data.artistId,
        id: uuidV4(),
        name: data.name,
        year: data.year,
      },
    });
    return album;
  }

  async getAllAlbums() {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    return this.prisma.album.findUnique({ where: { id } });
  }

  async updateAlbumInfo(id: string, albumNewInfo: CreateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (album) {
      album.name = albumNewInfo.name;
      album.year = albumNewInfo.year;
      album.artistId = albumNewInfo.artistId;
      await this.prisma.album.update({
        data: {
          name: albumNewInfo.name,
          year: albumNewInfo.year,
          artistId: albumNewInfo.artistId,
        },
        where: { id },
      });
    }
    return album;
  }

  async deleteAlbumById(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (album) {
      await this.prisma.album.delete({ where: { id } });
    }
  }

  async deleteArtistId(artistId: string) {
    const albums = await this.prisma.album.findMany();
    await Promise.all(
      albums.map(async (album) => {
        if (album.artistId === artistId) {
          await this.updateAlbumInfo(album.id, {
            artistId: null,
            name: album.name,
            year: album.year,
          });
        }
      }),
    );
  }
}
