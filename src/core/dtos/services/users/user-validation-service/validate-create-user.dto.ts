import { AbstractValidateCreateUserDto } from '@/core/abstractions/dtos/services/users/user-validation-service/validate-create-user.dto.interface';
import { IValidateCreateUserDto } from '@/core/interfaces/dtos/services/users/user-validation-service/validate-create-user.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCreateUserDto extends AbstractValidateCreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'The user uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  get id(): string {
    return this._props.id;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user email',
    example: 'teste@teste.com',
  })
  get email(): string {
    return this._props.email;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user password',
    example: '123456',
  })
  get password(): string {
    return this._props.password;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user first name',
    example: 'John',
  })
  get firstName(): IValidateCreateUserDto['firstName'] {
    return this._props.firstName;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user last name',
    example: 'Doe',
  })
  get lastName(): IValidateCreateUserDto['lastName'] {
    return this._props.lastName;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user birthdate',
    example: '1990-01-01',
  })
  get birthdate(): IValidateCreateUserDto['birthdate'] {
    return this._props.birthdate;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user document',
    example: '12345678901',
  })
  get document(): IValidateCreateUserDto['document'] {
    return this._props.document;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user document type',
    example: 'CPF',
  })
  get documentType(): IValidateCreateUserDto['documentType'] {
    return this._props.documentType;
  }

  @ApiProperty({
    type: 'string',
    description: 'role names',
    example: ['admin'],
  })
  get roles(): IValidateCreateUserDto['roles'] {
    return this._props.roles;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user creation date',
    example: '2022-01-01T00:00:00.000Z',
  })
  get createdAt(): IValidateCreateUserDto['createdAt'] {
    return this._props.createdAt;
  }

  @ApiProperty({
    type: 'string',
    description: 'The user update date',
    example: '2022-01-01T00:00:00.000Z',
  })
  get updatedAt(): IValidateCreateUserDto['updatedAt'] {
    return this._props.updatedAt;
  }

  constructor(private _props: IValidateCreateUserDto) {
    super();
  }
}
