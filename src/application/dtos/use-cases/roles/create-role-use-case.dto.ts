import { AbstractCreateRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/roles/create-role-use-case.dto.abstract';
import { ICreateRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/roles/create-role-use-case.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleUseCaseDto extends AbstractCreateRoleUseCaseDto {
  @ApiProperty({
    type: 'string',
    description: 'Role name',
    example: 'Admin',
  })
  get name() {
    return this._dto.name;
  }

  @ApiProperty({
    type: 'string',
    description: 'Role description',
    example: 'Administrator',
  })
  get description() {
    return this._dto.description;
  }

  constructor(private _dto: ICreateRoleUseCaseDto) {
    super();
  }
}
