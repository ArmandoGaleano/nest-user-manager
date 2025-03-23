import { AbstractCreateUserUseCaseDto } from '@/core/abstractions/dtos/use-cases/users/create-user-use-case.dto.abstract';
import { ICreateUserUseCaseDto } from '@/core/interfaces/dtos/use-cases/users/create-user-use-case.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserUseCaseDto extends AbstractCreateUserUseCaseDto {
  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User email',
    example: 'teste@teste.com',
  })
  get email() {
    return this.dto.email;
  }

  @ApiProperty({
    type: 'string',
    description: 'User password',
    example: 'password',
  })
  get password() {
    return this.dto.password;
  }

  @ApiProperty({
    type: 'string',
    description: 'User first name',
    example: 'John',
  })
  get firstName() {
    return this.dto.firstName;
  }

  @ApiProperty({
    type: 'string',
    description: 'User last name',
    example: 'Doe',
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
    description: 'User document',
    example: '123456789',
  })
  get document() {
    return this.dto.document;
  }

  @ApiProperty({
    enum: ['CPF', 'CNPJ'],
    description: 'User document type',
    type: 'string',
    example: 'CPF',
  })
  get documentType() {
    return this.dto.documentType;
  }

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
    description: 'User roles',
    example: ['role1', 'role2'],
  })
  get roles() {
    return this.dto.roles;
  }

  constructor(private dto: ICreateUserUseCaseDto) {
    super();
  }
}
