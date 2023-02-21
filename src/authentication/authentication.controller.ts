import { CreateUserDto } from './../users/dtos/create-user.dto';
import { UsersService } from './../users/users.service';
import { LoginUserDto } from './../users/dtos/login-user.dto';
import { AuthenticationService } from './authentication.service';
import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthenticationService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerUser(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post(`/login`)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
