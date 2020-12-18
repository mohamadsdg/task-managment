import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-paload';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService:JwtService
  ) {}
  public signUp(authCredential: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredential);
  }
  public async signIn(authCredential: AuthCredentialsDto) {
    const username = await this.userRepository.signIn(authCredential);
    const payload:JwtPayload = {username}
    const token = await this.jwtService.sign(payload);
    
    return {
        access_token : token
    }
  }
}
