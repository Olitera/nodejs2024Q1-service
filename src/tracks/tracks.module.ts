import { Module } from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { TracksController } from '../tracks/tracks.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [PrismaModule],
  exports: [TracksService],
})
export class TracksModule {}
