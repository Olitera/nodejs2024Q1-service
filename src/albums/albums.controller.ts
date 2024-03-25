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
import { Response } from 'express';
import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { AlbumsService } from 'src/albums/albums.service';
import { CreateAlbumDto } from 'src/interfaces/albums.interface';
import { TracksService } from 'src/tracks/tracks.service';

@Controller('album')
export class AlbumsController {
  constructor(
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  @Post()
  async createAlbum(
    @Body() body: CreateAlbumDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body?.name || !body?.year) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return;
    } else {
      return await this.albumsService.createAlbum(body);
    }
  }

  @Get()
  getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Album id is invalid');
      return;
    }
    const album = await this.albumsService.getAlbumById(id);
    if (!album) {
      res.status(StatusCodes.NOT_FOUND).send('Album does not exist');
      return;
    } else {
      return album;
    }
  }

  @Put(':id')
  async updateAlbumInfo(
    @Param('id') id: string,
    @Body() body: CreateAlbumDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Album id is invalid');
      return;
    }
    if (typeof body?.name !== 'string' || typeof body?.year !== 'number') {
      res.status(StatusCodes.BAD_REQUEST).send('Album dto is invalid');
      return;
    }
    const album = await this.albumsService.getAlbumById(id);
    if (!album) {
      res.status(StatusCodes.NOT_FOUND).send('Album does not exist');
      return;
    }
    return await this.albumsService.updateAlbumInfo(id, body);
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Album id is invalid');
      return;
    }
    const album = await this.albumsService.getAlbumById(id);
    if (!album) {
      res.status(StatusCodes.NOT_FOUND).send('Album does not exist');
      return;
    }
    await this.albumsService.deleteAlbumById(id);
    await this.tracksService.deleteAlbumId(id);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }
}
