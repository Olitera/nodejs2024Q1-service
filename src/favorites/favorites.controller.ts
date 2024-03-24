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
  addTrackToFavs(
    @Param('id') trackId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(trackId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Track id is invalid');
      return;
    }
    if (!this.tracksService.getTrackById(trackId)) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Track does not exist');
      return;
    }
    this.favoritesService.addTrackToFavs(trackId);
    return;
  }

  @Delete('track/:id')
  deleteTractFromFavs(@Param('id') trackId: string, @Res() res: Response) {
    if (!validate(trackId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Track id is invalid');
      return;
    }
    if (!this.favoritesService.isTrackInFavs(trackId)) {
      res.status(StatusCodes.NOT_FOUND).send('Track does not in favorite');
      return;
    }
    this.favoritesService.deleteTrackToFavs(trackId);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }

  @Post('album/:id')
  addAlbumToFavs(
    @Param('id') albumId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(albumId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Album id is invalid');
      return;
    }
    if (!this.albumService.getAlbumById(albumId)) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Album does not exist');
      return;
    }
    this.favoritesService.addAlbumToFavs(albumId);
    return;
  }

  @Delete('album/:id')
  deleteAlbumFromFavs(@Param('id') albumId: string, @Res() res: Response) {
    if (!validate(albumId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Album id is invalid');
      return;
    }
    if (!this.favoritesService.isAlbumInFavs(albumId)) {
      res.status(StatusCodes.NOT_FOUND).send('Album does not in favorite');
      return;
    }
    this.favoritesService.deleteAlbumFromFavs(albumId);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }

  @Post('artist/:id')
  addArtistToFavs(
    @Param('id') artistId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(artistId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    if (!this.artistService.getArtistById(artistId)) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send('Artist does not exist');
      return;
    }
    this.favoritesService.addArtistToFavs(artistId);
    return;
  }

  @Delete('artist/:id')
  deleteArtistFromFavs(@Param('id') artistId: string, @Res() res: Response) {
    if (!validate(artistId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    if (!this.favoritesService.isArtistInFavs(artistId)) {
      res.status(StatusCodes.NOT_FOUND).send('Artist does not in favorite');
      return;
    }
    this.favoritesService.deleteArtistFromFavs(artistId);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }
}
