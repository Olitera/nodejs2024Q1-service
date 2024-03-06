import { Injectable } from '@nestjs/common';
import { CreateUserReqData, User } from '../interfaces/user.interface';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class UsersService {

  private users: User[] = [];

   createUser(data: CreateUserReqData) {
    const user: User = {
      createdAt: 0,
      id: uuidV4(),
      login: data.login,
      password: data.password,
      updatedAt: 0,
      version: 0
    };
    this.users.push(user)
    return user
  }

  getAllUsers() {
    return this.users;
  }
}
