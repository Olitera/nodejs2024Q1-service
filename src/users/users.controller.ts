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
  createUser(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Partial<User> {
    if (!body?.login || !body?.password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Required fields are not filled in');
      return;
    }
    const user = this.usersService.createUser(body);
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
  getUserById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('User id is invalid');
      return;
    } else if (!this.usersService.getUserById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('User does not exist');
      return;
    } else {
      return this.usersService.getUserById(id);
    }
  }

  @Put(':id')
  updateUser(
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
    if (!this.usersService.getUserById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('User does not exist');
      return;
    }
    if (this.usersService.getUserById(id)?.password !== body?.oldPassword) {
      res.status(StatusCodes.FORBIDDEN).send('Password is wrong');
      return;
    }
    const user = this.usersService.updateUserPassword(id, body);
    return {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: Date.now(),
      version: user.version + 1,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() res: Response) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).send('User id is invalid');
      return;
    }
    if (!this.usersService.getUserById(id)) {
      res.status(StatusCodes.NOT_FOUND).send('User does not exist');
      return;
    }
    this.usersService.deleteUserById(id);
    res.status(StatusCodes.NO_CONTENT).send();
    return;
  }
}
