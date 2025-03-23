import { ApiProperty } from '@nestjs/swagger';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/update-user-repository.dto.abstract';
import { IUpdateUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/update-user-repository.dto.interface';

export class UpdateUserRepositoryDto extends AbstractUpdateUserRepositoryDto {
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
    description: 'User creation date',
    example: '2021-09-01T00:00:00Z',
  })
  get updatedAt() {
    return this.dto.updatedAt;
  }

  constructor(private dto: IUpdateUserRepositoryDto) {
    super();
  }
}
