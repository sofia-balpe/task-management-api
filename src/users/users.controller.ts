import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users') //a rota vai ter o caminho /users
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() user: UserDto) {
    this.userService.create(user);
  }
}
