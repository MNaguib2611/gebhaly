import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { Controller, Get, Body, Param, UseGuards, NotFoundException, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getAllUsers() {
    const user = await this.usersService.getAllUsers();
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getUserByUsername(@Param() param) {
    const user = await this.usersService.getUserByUserId(param.id);
    if (!user) {
      throw new NotFoundException('This user does not exist');
    }
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:update-password')
  async updateCurrentUserPassword(@Req() req, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    await this.usersService.updateUserPassByUserId(req.user.userId, updateUserPasswordDto.password);
    return { message: 'password updated successfully ' };
  }
}
