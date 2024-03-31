import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../interfaces/user.interface';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto,
               @Res({ passthrough: true }) res: Response,) {
    if (!body?.login || !body?.password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return;
    }
    const user = await this.usersService.createUser(body);
    return {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
    };
  }

  @Post('login')
  async login(@Body() body: CreateUserDto,
              @Res({ passthrough: true }) res: Response) {
    if (!body?.login || !body?.password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return
    }
    const user = await this.usersService.getUserByLogin(body.login);
    if (user.password !== body.password) {
      res
        .status(StatusCodes.FORBIDDEN)
        .send('Password is wrong');
      return
    }
    return {
      accessToken: this.authService.generateAccessToken({
        userId: user.id,
        login: user.login}),
      refreshToken: this.authService.generateRefreshToken({
        userId: user.id,
        login: user.login
      })
    }
  }

  @Post('refresh')
  async refresh(
    @Body() body: { refreshToken: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    if(!body?.refreshToken) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send('No refreshToken');
      return
    }
    const userData = this.authService.verifyRefreshToken(body.refreshToken);
    if (!userData?.userId) {
      res
        .status(StatusCodes.FORBIDDEN)
        .send('Refresh token is invalid or expired');
      return
    }
    return {
      accessToken: this.authService.generateAccessToken({
        userId: userData.userId,
        login: userData.login
      }),
      refreshToken: this.authService.generateRefreshToken({
        userId: userData.userId,
        login: userData.login
      })
    }
    }
}
