import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/core/database-entities/user-model.interface';
import type { ICreateUserDto } from './create-user-dto.interface';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User email',
    example: 'example@email.com',
  })
  email: UserModel['email'];
  @ApiProperty({
    type: 'string',
    description: 'User password encrypted with argon2',
    example: 'password',
  })
  password: UserModel['password'];
  @ApiProperty({
    type: 'string',
    description: 'User first name',
    example: 'Mr.',
  })
  firstName: UserModel['firstName'];
  @ApiProperty({
    type: 'string',
    description: 'User last name',
    example: 'Robot',
  })
  lastName: UserModel['lastName'];
  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User birthdate',
    example: '2000-01-01',
  })
  birthdate: UserModel['birthdate'];
  @ApiProperty({
    type: 'string',
    enum: ['admin', 'customer'],
    description: 'User role',
    example: 'customer',
  })
  role: UserModel['role'];
}
