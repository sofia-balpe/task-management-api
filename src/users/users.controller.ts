import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { create } from 'domain';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
        
        @Post()
        create(@Body() user: UserDto){
         this.userService.create(user);
        }
    }
}
