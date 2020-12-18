import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserService } from './user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
      private readonly userService:UserService
  ) {}

  @Post('/signup')
  public signUp(@Body(ValidationPipe) authCredential: AuthCredentialsDto) {
    return this.userService.signUp(authCredential)
  }
}
