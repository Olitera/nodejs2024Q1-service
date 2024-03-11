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
import { TracksService } from 'src/tracks/tracks.service';
import { CreateTrackDto } from 'src/interfaces/tracks.interface';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Post()
  createTrack(
    @Body() body: CreateTrackDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body?.name || !body?.duration) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return;
    } else {
      return this.tracksService.createTrack(body);
    }
  }

  @Get()
  getAllTracks() {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getTrackById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Track id is invalid');
      return;
    } else if (!this.tracksService.getTrackById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('Track does not exist');
      return;
    } else {
      return this.tracksService.getTrackById(id);
    }
  }

  @Put(':id')
  updateTrackInfo(
    @Param('id') id: string,
    @Body() body: CreateTrackDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Track id is invalid');
      return;
    }
    if (!body?.name || !body?.duration) {
      res.status(StatusCodes.BAD_REQUEST).send('Track dto is invalid');
      return;
    }
    if (!this.tracksService.getTrackById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('Track does not exist');
      return;
    }
    return this.tracksService.updateTrackInfo(id, body);
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: string, @Res() res: Response) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('Track id is invalid');
      return;
    }
    if (!this.tracksService.getTrackById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('Track does not exist');
      return;
    }
    this.tracksService.deleteTrackById(id);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }
}
