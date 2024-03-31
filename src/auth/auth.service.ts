import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService) {}



  async generateJwtToken(payload: any) {
    return this.jwtService.sign(payload);
  }

}
