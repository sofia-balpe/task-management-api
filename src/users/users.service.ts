import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid'; //função do bcrypt para gerar um id
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = hashSync(newUser.password, 10);
    this.users.push(newUser);
  }

  //Consulta de usuário pelo nome:
  findByUserName(username: string): UserDto | null {
    //vai retonar um userDto ou nulo
    return this.users.find((user) => user.username === username);
  }
}
