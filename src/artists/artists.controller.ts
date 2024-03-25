import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from '../interfaces/artists.interface';
import { Response } from 'express';
import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Controller('artist')
export class ArtistsController {
  constructor(
    private artistsService: ArtistsService,
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {}

  @Post()
  async createArtist(
    @Body() body: CreateArtistDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body?.name || !body?.grammy) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return;
    } else {
      return await this.artistsService.createArtist(body);
    }
  }

  @Get()
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    const artist = await this.artistsService.getArtistById(id);
    if (!artist) {
      res.status(StatusCodes.NOT_FOUND).send('Artist does not exist');
      return;
    } else {
      return artist;
    }
  }

  @Put(':id')
  async updateArtistInfo(
    @Param('id') id: string,
    @Body() body: CreateArtistDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    if (typeof body?.grammy !== 'boolean' || typeof body?.name !== 'string') {
      res.status(StatusCodes.BAD_REQUEST).send('Artist dto is invalid');
      return;
    }
    const artist = await this.artistsService.getArtistById(id);
    if (!artist) {
      res.status(StatusCodes.NOT_FOUND).send('Artist does not exist');
      return;
    }
    return await this.artistsService.updateArtistInfo(id, body);
  }

  @Delete(':id')
  async deleteArtist(@Param('id') id: string, @Res() res: Response) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Artist id is invalid');
      return;
    }
    const artist = await this.artistsService.getArtistById(id);
    if (!artist) {
      res.status(StatusCodes.NOT_FOUND).send('Artist does not exist');
      return;
    }
    await this.artistsService.deleteArtistById(id);
    await this.tracksService.deleteArtistId(id);
    await this.albumsService.deleteArtistId(id);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }
}
