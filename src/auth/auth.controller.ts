import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../interfaces/user.interface';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Controller('auth')
export class AuthController {

  constructor(private readonly usersService: UsersService) {}

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
    const user = await this.usersService.getUserById(body.login);
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send('User does not exist');
      return
    }
    if (user.password !== body.password) {
      res
        .status(StatusCodes.FORBIDDEN)
        .send('Password is wrong');
      return
    }
  }
}
