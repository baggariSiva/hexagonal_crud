import { PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsDateString()
  dob: string;

  @IsEnum({ ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE' })
  status: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
