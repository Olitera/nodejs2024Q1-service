import { Injectable } from '@nestjs/common';
import { Artist } from '../interfaces/artists.interface';

@Injectable()
export class ArtistsService{
  private artists: Artist[] = [];
}
