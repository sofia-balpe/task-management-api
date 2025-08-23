import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.Dto';
import { AuthService } from './auth.service';

@Controller('auth') // rota /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login') //rota /auth/login
  signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): AuthResponseDto {
    return this.authService.signIn(username, password);
  }
}
