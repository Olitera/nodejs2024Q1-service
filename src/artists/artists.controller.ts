import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { Artist } from '../interfaces/artists.interface';

@Controller('artist')
export class ArtistsController {

  constructor(private artistsService: ArtistsService) {}

  @Post()
  createArtist() {
    return this.artistsService.createArtist();
  }

  @Get()
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    return this.artistsService.getArtistById(id);
  }

  @Put(':id')
  updateArtistInfo(@Param('id') id: string, @Body() body: Artist) {
    return this.artistsService.updateArtistInfo(id, body);
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: string) {
    return this.artistsService.deleteArtistById(id)
  }

}
