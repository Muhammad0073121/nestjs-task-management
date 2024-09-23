import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('signup')
  signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.AuthService.signup(authCredentialsDto);
  }

  @Post('signin')
  signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: String }> {
    return this.AuthService.signin(authCredentialsDto);
  }
}
