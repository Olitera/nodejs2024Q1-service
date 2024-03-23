import { Injectable } from '@nestjs/common';
import { Artist, CreateArtistDto } from '../interfaces/artists.interface';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistsService {

  constructor(private prisma: PrismaService) {}

  async createArtist(data: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: {
        grammy: data.grammy,
        id: uuidV4(),
        name: data.name
      }
    })
    return artist;
  }

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    return this.prisma.artist.findUnique({where: {id}});
  }

  async updateArtistInfo(id: string, artistNewInfo: CreateArtistDto) {
    const artist = await this.prisma.artist.findUnique({where: {id}});
    if (artist) {
      artist.name = artistNewInfo.name;
      artist.grammy = artistNewInfo.grammy;
      await this.prisma.artist.update(
        {data: {
        name: artistNewInfo.name,
            grammy: artistNewInfo.grammy
        },
        where: {id}})
    }
    return artist;
  }

  async deleteArtistById(id: string) {
    const artist =  await this.prisma.artist.findUnique({where: {id}});
    console.log(artist)
    if (artist) {
      await this.prisma.artist.delete({where: {id}})
    }
  }
}
