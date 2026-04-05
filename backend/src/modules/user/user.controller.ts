import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() payload: { username: string }) {
    return this.userService.create({ 
      name: payload.username, 
      email: `${payload.username}@example.com` 
    });
  }
}
