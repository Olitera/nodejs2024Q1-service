import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import * as process from 'process';
import { LoggingService } from '../logging/logging.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LoggingService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
    UsersModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
