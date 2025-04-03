import { ApiProperty } from '@nestjs/swagger';
import { AbstractSearchUsersRepositoryResultDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository-result.dto.abstract';
import { ISearchUsersRepositoryResultDto } from '@/core/interfaces/dtos/repositories/users/search-users-repository-result.dto.interface';

export class SearchUsersRepositoryResultDto extends AbstractSearchUsersRepositoryResultDto {
  @ApiProperty({
    type: 'string',
    description: 'User uuid',
    example: '123456789',
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
    description: 'User created at',
    example: '2021-12-31T23:59:59',
  })
  get createdAt() {
    return this._dto.createdAt;
  }

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'User updated at',
    example: '2021-12-31T23:59:59',
  })
  get updatedAt() {
    return this._dto.updatedAt;
  }

  @ApiProperty({
    type: 'number',
    description: 'Page number',
    example: 1,
  })
  get page() {
    return this._dto.page;
  }

  get limit() {
    return this._dto.limit;
  }

  constructor(private _dto: ISearchUsersRepositoryResultDto) {
    super();
  }
}
