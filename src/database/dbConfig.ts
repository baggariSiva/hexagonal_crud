import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { DataSource } from 'typeorm';

// credentials will change as per the local system config

export const databaseConfig: TypeOrmModuleOptions = {
  autoLoadEntities: true,
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'nest_crud',
  port: 5432,
  synchronize: true,
  entities: [User],
  logging: true,
};

export default new DataSource(
  JSON.parse(JSON.stringify({ ...databaseConfig })),
);
