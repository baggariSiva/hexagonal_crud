import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user/user.controller';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/adapters/user.repository';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'UserRepositoryPort', useClass: UserRepository },
  ],
})
export class UserModule {}
