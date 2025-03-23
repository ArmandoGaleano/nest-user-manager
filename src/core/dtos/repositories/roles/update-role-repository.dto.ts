import { AbstractUpdateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/update-role-repository.dto.abstract';
import { IUpdateRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/update-role-repository.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto extends AbstractUpdateRoleRepositoryDto {
  @ApiProperty({
    type: 'string',
    description: 'Role uuid',
    example: 'f7b3b2b0-4b7b-4b7b-8b7b-4b7b7b7b7b7b',
  })
  get id() {
    return this.dto.id;
  }
  @ApiProperty({
    type: 'string',
    enum: ['admin', 'customer'],
    description: 'Role name',
    example: 'customer',
  })
  get name() {
    return this.dto.name;
  }
  @ApiProperty({
    type: 'string',
    description: 'Role description',
    example: 'Customer role',
  })
  get description() {
    return this.dto.description;
  }
  @ApiProperty({
    type: 'string',
    description: 'Role creation date',
    example: '2021-09-01T00:00:00Z',
  })
  get updatedAt() {
    return this.dto.updatedAt;
  }

  constructor(private dto: IUpdateRoleRepositoryDto) {
    super();
  }
}
