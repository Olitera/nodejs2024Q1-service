import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateTrackDto, Track } from '../interfaces/tracks.interface';

@Injectable()
export class TracksService{
  private tracks: Track[] = [];

  createTrack(data: CreateTrackDto) {
    const track: Track = {
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
      id: uuidV4(),
      name: data.name
    };
    this.tracks.push(track);
    return track;
  }

  getAllTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  updateTrackInfo(id: string, trackNewInfo: CreateTrackDto) {
    const track = this.tracks.find((track) => track.id === id);
    if(track) {
      track.name = trackNewInfo.name;
      track.duration = trackNewInfo.duration;
      track.albumId = trackNewInfo.albumId;
      track.artistId = trackNewInfo.albumId;
    }
    return track
  }

  deleteTrackById(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if(track) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
    }
  }

  deleteArtistId(artistId: string) {
    const tracks = this.tracks.filter((track) => track.artistId === artistId);
    tracks.forEach(track=> this.updateTrackInfo(track.id, { artistId: null, name: track.name, duration: track.duration, albumId: track.albumId })
    )
    }

  deleteAlbumId(albumId: string) {
    const tracks = this.tracks.filter((track) => track.albumId === albumId);
    tracks.forEach(track=> this.updateTrackInfo(track.id, { artistId: track.artistId, name: track.name, duration: track.duration, albumId: null })
    )
  }
}
