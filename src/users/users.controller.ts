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
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/interfaces/user.interface';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
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

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('User id is invalid');
      return;
    }
    const user = await this.usersService.getUserById(id)
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).send('User does not exist');
      return;
    } else {
      return user;
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdatePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('User id is invalid');
      return;
    }
    if (!body?.oldPassword || !body?.newPassword) {
      res.status(StatusCodes.BAD_REQUEST).send('User dto is invalid');
      return;
    }
    const us = await this.usersService.getUserById(id);
    if (!us) {
      res.status(StatusCodes.NOT_FOUND).send('User does not exist');
      return;
    }
    if (us?.password !== body?.oldPassword) {
      res.status(StatusCodes.FORBIDDEN).send('Password is wrong');
      return;
    }
    const user = await this.usersService.updateUserPassword(id, body);
    return {
      id: user.id,
      login: user.login,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: Date.now(),
      version: user.version + 1,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('User id is invalid');
      return;
    }
    const us = await this.usersService.getUserById(id)
    if (!us) {
      res.status(StatusCodes.NOT_FOUND).send('User does not exist');
      return;
    }
    await this.usersService.deleteUserById(id);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }
}
