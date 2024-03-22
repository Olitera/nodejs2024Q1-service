import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from '../interfaces/user.interface';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private prisma: PrismaService) {}

async createUser(data: CreateUserDto) {
    const date = Date.now();
    const user = await this.prisma.user.create({
      data: {
        createdAt: new Date(date),
        id: uuidV4(),
        login: data.login,
        password: data.password,
        updatedAt: new Date(date),
        version: 1,
      }
    })
  // @ts-ignore
  user.updatedAt = user.updatedAt.getTime()
  // @ts-ignore
  user.createdAt = user.createdAt.getTime()
    return user;
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({where: {id}});
  }

  async updateUserPassword(id: string, passwords: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({where: {id}});
    if (user.password === passwords.oldPassword) {
      user.password = passwords.newPassword;
      await this.prisma.user.update({data: {
        password: passwords.newPassword,
        version: user.version + 1
        }, where: {id} })
    }
    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.prisma.user.findUnique({where: {id}});
    if (user) {
      await this.prisma.user.delete({where: {id}})
    }
  }
}
