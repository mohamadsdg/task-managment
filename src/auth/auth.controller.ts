import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public signUp(@Body(ValidationPipe) authCredential: AuthCredentialsDto) {
    return this.authService.signUp(authCredential);
  }

  @Post('/signin')
  public signIn(@Body(ValidationPipe) authCredential: AuthCredentialsDto) {
    return this.authService.signIn(authCredential);
  }
}
