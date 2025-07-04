import { ApiProperty } from '@nestjs/swagger';

import { ICreateUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/create-user-repository.dto.interface';
import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';

export class CreateUserRepositoryDto
  extends AbstractAutoSerializableClass<ICreateUserRepositoryDto>
  implements ICreateUserRepositoryDto
{
  @ApiProperty({
    type: 'string',
    description: 'User id',
    example: 'uuid',
  })
  get id() {
    return this._dto.id;
  }

  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User email',
    example: 'example@email.com',
  })
  get email() {
    return this._dto.email;
  }

  @ApiProperty({
    type: 'string',
    description: 'User password encrypted with argon2',
    example: 'password',
  })
  get password() {
    return this._dto.password;
  }

  @ApiProperty({
    type: 'string',
    description: 'User first name',
    example: 'Mr.',
  })
  get firstName() {
    return this._dto.firstName;
  }

  @ApiProperty({
    type: 'string',
    description: 'User last name',
    example: 'Robot',
  })
  get lastName() {
    return this._dto.lastName;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User birthdate',
    example: '2000-01-01',
  })
  get birthdate() {
    return this._dto.birthdate;
  }

  @ApiProperty({
    type: 'string',
    enum: ['admin', 'customer'],
    description: 'User role',
    example: 'customer',
  })
  get document() {
    return this._dto.document;
  }

  @ApiProperty({
    type: 'string',
    enum: ['CPF'],
    description: 'User document type',
    example: 'CPF',
  })
  get documentType() {
    return this._dto.documentType;
  }

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'User creation date',
    example: '2021-09-01T00:00:00Z',
  })
  get createdAt() {
    return this._dto.createdAt;
  }

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'User update date',
    example: '2021-09-01T00:00:00Z',
  })
  get updatedAt() {
    return this._dto.updatedAt;
  }

  constructor(private _dto: ICreateUserRepositoryDto) {
    super();
  }
}
