import { ApiProperty } from '@nestjs/swagger';
import type { ICreateRoleRepositoryDto } from '../../../interfaces/dtos/repositories/roles/create-role-repository.dto.interface';
import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/create-role-repository.dto.abstract';

export class CreateRoleRepositoryDto extends AbstractCreateRoleRepositoryDto {
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
  get createdAt() {
    return this.dto.createdAt;
  }

  @ApiProperty({
    type: 'string',
    description: 'Role last update date',
    example: '2021-09-01T00:00:00Z',
  })
  get updatedAt() {
    return this.dto.updatedAt;
  }

  constructor(private dto: ICreateRoleRepositoryDto) {
    super();
  }
}
