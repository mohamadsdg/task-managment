import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService,UserService]
})
export class AuthModule {}
