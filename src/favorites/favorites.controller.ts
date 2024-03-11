import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private tracksService: TracksService
  ) {}

  @Get()
  getAllFavorites(@Res({ passthrough: true })res: Response) {
    return this.favoritesService.getAllFavorites()
  }

  @Post('track/:id')
    addTrackToFavs(@Param('id') trackId: string, @Res({ passthrough: true })res: Response) {
    if (!validate(trackId)) {
      res.status(StatusCodes.BAD_REQUEST).send('Track id is invalid');
      return;
    }
    if (!this.tracksService.getTrackById(trackId)) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Track does not exist');
      return;
    }
    this.favoritesService.addTrackToFavs(trackId);
    return
    }

  @Delete('track/:id')
  deleteTractFromFavs(@Param('id') trackId: string, @Res() res: Response) {
    this.favoritesService.deleteTrackTofavs(trackId);
    res.status(StatusCodes.NO_CONTENT).send();
    return
  }
}
