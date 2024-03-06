import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserReqData } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post()
  createUser(data: CreateUserReqData) {
    this.usersService.createUser(data)
  }
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

}
