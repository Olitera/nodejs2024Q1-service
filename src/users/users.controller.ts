import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePasswordDto, User } from 'src/interfaces/user.interface';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsTokenFactory } from '@nestjs/core/pipes';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post()
  createUser(@Body() body): Partial<User> {
    const user = this.usersService.createUser(body);
    return {id: user.id, login: user.login, createdAt: user.createdAt, updatedAt: user.updatedAt, version: user.version}
  }
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id)
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body) {
    const user = this.usersService.updateUserPassword(id, body);
    return {id: user.id, login: user.login, createdAt: user.createdAt, updatedAt: user.updatedAt, version: user.version, password: user.password}
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserById(id)
  }
}
