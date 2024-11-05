import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto, UserDto } from 'src/dto/user.dto';
import { UserRepositoryPort } from 'src/ports/user.repository.port';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}
  async addUser(user: UserDto) {
    try {
      const emailInUse = await this.userRepository.findByEmail(user.email);
      if (emailInUse) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Provided email is currently in use',
        };
      }
      const newUser = await this.userRepository.add(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User added successfully',
        data: {
          userDetails: newUser,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message,
      };
    }
  }

  async fetchAllUsers() {
    try {
      const users = await this.userRepository.fetchAll();
      return {
        statusCode: HttpStatus.OK,
        data: { users: users[0], count: users[1] },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message,
      };
    }
  }

  async fetchById(id: string) {
    try {
      const user = await this.userRepository.fetchById(id);
      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: user,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message,
      };
    }
  }

  async deleteUserById(id: string) {
    try {
      const response = await this.fetchById(id);
      if (response.statusCode != HttpStatus.OK) return response;
      await this.userRepository.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message,
      };
    }
  }

  async updateUser(id: string, payload: UpdateUserDto) {
    try {
      const response = await this.fetchById(id);
      if (response.statusCode != HttpStatus.OK) return response;
      if ('email' in payload && response.data.email == payload.email)
        delete payload.email;

      const validateEmail =
        'email' in payload
          ? (await this.userRepository.findByEmail(payload.email)) == null
          : true;

      if (validateEmail == false)
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Provided email is currently in use',
        };
      if (Object.keys(payload).length)
        await this.userRepository.update(id, payload);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message,
      };
    }
  }
}
