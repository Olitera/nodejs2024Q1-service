import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private tracksService: TracksService,
    private albumService: AlbumsService,
    private artistService: ArtistsService,
  ) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  async addTrackToFavs(
    @Param('id') trackId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(trackId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Track id is invalid');
      return;
    }
    const track = await this.tracksService.getTrackById(trackId)
    if (!track) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Track does not exist');
      return;
     }
   return this.favoritesService.addTrackToFavs(trackId);
  }

  @Delete('track/:id')
  async deleteTractFromFavs(@Param('id') trackId: string, @Res() res: Response) {
    if (!validate(trackId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Track id is invalid');
      return;
    }
    const isTrack = await this.favoritesService.isTrackInFavs(trackId);
    if (!isTrack) {
      res.status(StatusCodes.NOT_FOUND).send('Track does not in favorite');
      return;
    }
    await this.favoritesService.deleteTrackToFavs(trackId);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }

  @Post('album/:id')
  async addAlbumToFavs(
    @Param('id') albumId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(albumId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Album id is invalid');
      return;
    }
    const  album = await this.albumService.getAlbumById(albumId);
    if (!album) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Album does not exist');
      return;
    }
    return this.favoritesService.addAlbumToFavs(albumId);
  }

  @Delete('album/:id')
  async deleteAlbumFromFavs(@Param('id') albumId: string, @Res() res: Response) {
    if (!validate(albumId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Album id is invalid');
      return;
    }
    const isAlbum = await this.favoritesService.isAlbumInFavs(albumId);
    if (!isAlbum) {
      res.status(StatusCodes.NOT_FOUND).send('Album does not in favorite');
      return;
    }
    await this.favoritesService.deleteAlbumFromFavs(albumId);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }

  @Post('artist/:id')
  async addArtistToFavs(
    @Param('id') artistId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(artistId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    const artist = await this.artistService.getArtistById(artistId);
    if (!artist) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send('Artist does not exist');
      return;
    }
    await this.favoritesService.addArtistToFavs(artistId);
    return;
  }

  @Delete('artist/:id')
  async deleteArtistFromFavs(@Param('id') artistId: string, @Res() res: Response) {
    if (!validate(artistId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    const isArtist = await this.favoritesService.isArtistInFavs(artistId);
    if (!isArtist) {
      res.status(StatusCodes.NOT_FOUND).send('Artist does not in favorite');
      return;
    }
    await this.favoritesService.deleteArtistFromFavs(artistId);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }
}
