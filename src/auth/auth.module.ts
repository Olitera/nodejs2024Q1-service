import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module ({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' }
  }),
  UsersModule],
  exports: [JwtModule]
})
export class AuthModule {}
