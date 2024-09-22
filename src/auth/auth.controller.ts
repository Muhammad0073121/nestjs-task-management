import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('signup')
  signup(@Body() authCredentialsDto: authCredentialsDto): Promise<void> {
    return this.AuthService.signup(authCredentialsDto);
  }

  @Post('signin')
  signin(
    @Body() authCredentialsDto: authCredentialsDto,
  ): Promise<{ accessToken: String }> {
    return this.AuthService.signin(authCredentialsDto);
  }
}
