import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('saved')
  getUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('saved/:id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @Post('import/:id')
  createUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.saveUser(id);
  }

  @Delete('saved/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
