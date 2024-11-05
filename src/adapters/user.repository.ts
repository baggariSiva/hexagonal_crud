import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto, UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user';
import { UserRepositoryPort } from 'src/ports/user.repository.port';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async add(user: UserDto): Promise<User> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async update(id: string, user: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async fetchById(id: string): Promise<User> {
    const fetchUser = await this.userRepository.findOne({ where: { id } });
    return fetchUser;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async fetchAll(): Promise<[User[], number]> {
    const users = await this.userRepository.findAndCount({
      order: { createdAt: 'DESC' },
    });
    return users;
  }
}
