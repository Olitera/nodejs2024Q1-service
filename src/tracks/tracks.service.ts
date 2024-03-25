import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateTrackDto } from '../interfaces/tracks.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async createTrack(data: CreateTrackDto) {
    const track = await this.prisma.track.create({
      data: {
        albumId: data.albumId,
        artistId: data.artistId,
        duration: data.duration,
        id: uuidV4(),
        name: data.name,
      },
    });
    return track;
  }

  async getAllTracks() {
    return this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async updateTrackInfo(id: string, trackNewInfo: CreateTrackDto) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (track) {
      track.name = trackNewInfo.name;
      track.duration = trackNewInfo.duration;
      track.albumId = trackNewInfo.albumId;
      track.artistId = trackNewInfo.albumId;
      await this.prisma.track.update({
        data: {
          name: trackNewInfo.name,
          duration: trackNewInfo.duration,
          albumId: trackNewInfo.albumId,
          artistId: trackNewInfo.artistId,
        },
        where: { id },
      });
    }
    return track;
  }

  async deleteTrackById(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (track) {
      await this.prisma.track.delete({ where: { id } });
    }
  }

  async deleteArtistId(artistId: string) {
    const tracks = await this.prisma.track.findMany();
    await Promise.all(
      tracks.map(async (track) => {
        if (track.artistId === artistId) {
          await this.updateTrackInfo(track.id, {
            artistId: null,
            name: track.name,
            duration: track.duration,
            albumId: track.albumId,
          });
        }
      }),
    );
  }

  async deleteAlbumId(albumId: string) {
    const tracks = await this.prisma.track.findMany();
    await Promise.all(
      tracks.map(async (track) => {
        if (track.albumId === albumId) {
          await this.updateTrackInfo(track.id, {
            artistId: track.artistId,
            name: track.name,
            duration: track.duration,
            albumId: null,
          });
        }
      }),
    );
  }
}
