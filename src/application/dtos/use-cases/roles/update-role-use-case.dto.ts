import { AbstractUpdateRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/roles/update-role-use-case.dto.abstract';
import { IUpdateRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/roles/update-role-use-case.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleUseCaseDto extends AbstractUpdateRoleUseCaseDto {
  @ApiProperty({
    type: 'string',
    description: 'Role ID',
    example: '1234567890abcdef12345678',
  })
  get id() {
    return this._dto.id;
  }

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

  constructor(private _dto: IUpdateRoleUseCaseDto) {
    super();
  }
}
