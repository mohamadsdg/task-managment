import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public signUp(authCredential: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredential);
  }
  public signIn(authCredential: AuthCredentialsDto) {
    return this.userRepository.signIn(authCredential)
  }
}
