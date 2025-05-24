import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/create-user-use-case.dto.interface';
import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';

export class CreateUserUseCaseDto
  extends AbstractAutoSerializableClass<ICreateUserUseCaseDto>
  implements ICreateUserUseCaseDto
{
  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User email',
    example: 'teste@teste.com',
  })
  get email() {
    return this._dto.email;
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
    format: 'date',
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

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
    description: 'Role uuid list',
    example: ['6a4a980c-af44-4368-a549-b0829920ea35'],
  })
  get roleNames() {
    return this._dto.roleNames;
  }

  constructor(private _dto: ICreateUserUseCaseDto) {
    super();
  }
}
