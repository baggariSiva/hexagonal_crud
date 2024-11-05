import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateUserDto, UserDto } from 'src/dto/user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // fetch all users
  @Get('fetchall')
  async fetchAllUsers() {
    return await this.userService.fetchAllUsers();
  }

  // add new user
  @Post('add')
  async addUser(@Body() payload: UserDto) {
    return await this.userService.addUser(payload);
  }

  // fetch user details by user id
  @Get(':id')
  async fetchUserById(@Param('id') id: string) {
    return await this.userService.fetchById(id);
  }

  // delete user by user id
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }

  // update user details by user id
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return await this.userService.updateUser(id, payload);
  }
}
