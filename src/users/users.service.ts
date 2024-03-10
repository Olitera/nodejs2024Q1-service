import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from '../interfaces/user.interface';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser(data: CreateUserDto) {
    const date = Date.now();
    const user: User = {
      createdAt: date,
      id: uuidV4(),
      login: data.login,
      password: data.password,
      updatedAt: date,
      version: 1,
    };
    this.users.push(user);
    return user;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  updateUserPassword(id: string, passwords: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (user.password === passwords.oldPassword) {
      user.password = passwords.newPassword;
    }
    return user;
  }

  deleteUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
  }
}
