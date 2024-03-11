import { Module } from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { TracksController } from '../tracks/tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService]
})
export class TracksModule {}
