import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { CreateArtistDto } from '../interfaces/artists.interface';
import { Response } from 'express';
import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { TracksService } from 'src/tracks/tracks.service';


@Controller('artist')
export class ArtistsController {

  constructor(
    private artistsService: ArtistsService,
    private tracksService: TracksService
              ) {}

  @Post()
  createArtist(@Body() body: CreateArtistDto, @Res({ passthrough: true }) res: Response) {
    if (!body?.name || !body?.grammy) {
      res.status(StatusCodes.BAD_REQUEST).send('Required fields are not filled in');
      return;
    } else {
      return this.artistsService.createArtist(body);
    }
  }

  @Get()
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    } else if (!this.artistsService.getArtistById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('Artist does not exist');
      return;
    } else {
      return this.artistsService.getArtistById(id);
    }
  }

  @Put(':id')
  updateArtistInfo(@Param('id') id: string, @Body() body: CreateArtistDto, @Res({ passthrough: true }) res: Response,) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    if (typeof body?.grammy !== 'boolean' || typeof body?.name !== 'string') {
      res.status(StatusCodes.BAD_REQUEST).send('Artist dto is invalid');
      return;
    }
    if (!this.artistsService.getArtistById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('Artist does not exist');
      return;
    }
    return this.artistsService.updateArtistInfo(id, body);
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: string, @Res() res: Response) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    if (!this.artistsService.getArtistById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('Artist does not exist');
      return;
    }
    this.artistsService.deleteArtistById(id);
    this.tracksService.deleteArtistId(id)
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }
}
