import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.Dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable() //gerar o token:
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  sgnIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.userService.findByUserName(username);

    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      //se o username não for encontrado ou a senha comparada não for igual vai exibir a mensagem padrão
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);
    //obs: temos que retonar tanto o token quanto a quantidade de tempo que ele vai expirar
    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
