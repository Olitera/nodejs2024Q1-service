import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../interfaces/user.interface';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';
import { LoggingService } from 'src/logging/logging.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    private loggingService: LoggingService,
  ) {}

  @Post('signup')
  async signup(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body?.login || !body?.password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      this.loggingService.error('Failed to signup user.', new Error());
      return;
    }
    this.loggingService.log('User signed up successfully.');
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
  async login(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body?.login || !body?.password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return;
    }
    const user = await this.usersService.getUserByLogin(body.login);
    if (user.password !== body.password) {
      res.status(StatusCodes.FORBIDDEN).send('Password is wrong');
      return;
    }
    const accessToken = this.authService.generateAccessToken({
      userId: user.id,
      login: user.login,
    });
    const refreshToken = this.authService.generateRefreshToken({
      userId: user.id,
      login: user.login,
    });
    res.status(StatusCodes.OK).send({ accessToken, refreshToken });
  }

  @Post('refresh')
  async refresh(
    @Body() body: { refreshToken: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body?.refreshToken) {
      res.status(StatusCodes.UNAUTHORIZED).send('No refreshToken');
      return;
    }
    let userData: { userId: any; login: any } | null;
    try {
      userData = this.authService.verifyRefreshToken(body.refreshToken);
    } catch (error) {
      res
        .status(StatusCodes.FORBIDDEN)
        .send('Refresh token is invalid or expired');
      return;
    }
    if (!userData?.userId) {
      res
        .status(StatusCodes.FORBIDDEN)
        .send('Refresh token is invalid or expired');
      return;
    }
    let accessToken, refreshToken;
    try {
      accessToken = this.authService.generateAccessToken({
        userId: userData.userId,
        login: userData.login,
      });
      refreshToken = this.authService.generateRefreshToken({
        userId: userData.userId,
        login: userData.login,
      });
    } catch (error) {
      res
        .status(StatusCodes.FORBIDDEN)
        .send('Refresh token is invalid or expired');
      return;
    }

    res.status(StatusCodes.OK).send({ accessToken, refreshToken });
    return;
  }
}
