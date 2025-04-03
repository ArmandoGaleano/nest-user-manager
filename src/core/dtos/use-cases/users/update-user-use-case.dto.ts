import { AbstractUpdateUserUseCaseDto } from '@/core/abstractions/dtos/use-cases/users/update-user-use-case.dto.abstract';
import { IUpdateUserUseCaseDto } from '@/core/interfaces/dtos/use-cases/users/update-user-use-case.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserUseCaseDto extends AbstractUpdateUserUseCaseDto {
  @ApiProperty({
    type: 'string',
    description: 'User uui',
    example: '123456789',
  })
  get id() {
    return this._dto.id;
  }

  @ApiProperty({
    type: 'string',
    description: 'User password',
    example: 'password',
  })
  get password() {
    return this._dto.password;
  }

  @ApiProperty({
    type: 'string',
    description: 'User first name',
    example: 'John',
  })
  get firstName() {
    return this._dto.firstName;
  }

  @ApiProperty({
    type: 'string',
    description: 'User last name',
    example: 'Doe',
  })
  get lastName() {
    return this._dto.lastName;
  }

  @ApiProperty({
    type: 'string',
    description: 'User birthdate',
    example: '2000-01-01',
  })
  get birthdate() {
    return this._dto.birthdate;
  }

  @ApiProperty({
    type: 'string',
    description: 'User document',
    example: '123456789',
  })
  get document() {
    return this._dto.document;
  }

  @ApiProperty({
    enum: ['CPF', 'CNPJ'],
    description: 'User document type',
    type: 'string',
    example: 'CPF',
  })
  get documentType() {
    return this._dto.documentType;
  }

  constructor(private _dto: IUpdateUserUseCaseDto) {
    super();
  }
}
