import { UpdateUserDto, UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user';

export interface UserRepositoryPort {
  add(user: UserDto): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  fetchById(id: string): Promise<User>;

  delete(id: string): Promise<void>;

  fetchAll(): Promise<[User[], number]>;

  update(id: string, user: UpdateUserDto): Promise<void>;
}
