import { ApiProperty } from '@nestjs/swagger';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { IUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/user-repository.dto.interface';

export class UserRepositoryDto extends AbstractUserRepositoryDto {
  @ApiProperty({
    type: 'string',
    description: 'User uuid',
    example: '123456789',
  })
  get id() {
    return this.dto.id;
  }

  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User email',
    example: 'example@email.com',
  })
  get email() {
    return this.dto.email;
  }

  @ApiProperty({
    type: 'string',
    description: 'User password encrypted with argon2',
    example: 'password',
  })
  get password() {
    return this.dto.password;
  }

  @ApiProperty({
    type: 'string',
    description: 'User first name',
    example: 'Mr.',
  })
  get firstName() {
    return this.dto.firstName;
  }

  @ApiProperty({
    type: 'string',
    description: 'User last name',
    example: 'Robot',
  })
  get lastName() {
    return this.dto.lastName;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User birthdate',
    example: '2000-01-01',
  })
  get birthdate() {
    return this.dto.birthdate;
  }

  @ApiProperty({
    type: 'string',
    enum: ['admin', 'customer'],
    description: 'User role',
    example: 'customer',
  })
  get document() {
    return this.dto.document;
  }

  @ApiProperty({
    type: 'string',
    enum: ['CPF'],
    description: 'User document type',
    example: 'CPF',
  })
  get documentType() {
    return this.dto.documentType;
  }

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'User created at',
    example: '2021-12-31T23:59:59',
  })
  get createdAt() {
    return this.dto.createdAt;
  }

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'User updated at',
    example: '2021-12-31T23:59:59',
  })
  get updatedAt() {
    return this.dto.updatedAt;
  }

  constructor(private dto: IUserRepositoryDto) {
    super();
  }
}
