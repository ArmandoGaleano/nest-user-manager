import { AbstractCreateRoleUseCaseDto } from '@/core/abstractions/dtos/use-cases/roles/create-role-use-case.dto.abstract';
import { ICreateRoleUseCaseDto } from '@/core/interfaces/dtos/use-cases/roles/create-role-use-case.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleUseCaseDto extends AbstractCreateRoleUseCaseDto {
  @ApiProperty({
    type: 'string',
    description: 'Role name',
    example: 'Admin',
  })
  get name() {
    return this.dto.name;
  }

  @ApiProperty({
    type: 'string',
    description: 'Role description',
    example: 'Administrator',
  })
  get description() {
    return this.dto.description;
  }

  constructor(private dto: ICreateRoleUseCaseDto) {
    super();
  }
}
