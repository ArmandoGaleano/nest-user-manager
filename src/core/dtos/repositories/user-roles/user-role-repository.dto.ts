import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { IUserRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/user-roles/user-role-repository.dto.interface';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto extends AbstractUserRoleRepositoryDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'User id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public user_id: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Role id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public role_id: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role created at',
    example: '2000-01-01',
  })
  public createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role updated at',
    example: '2000-01-01',
  })
  public updatedAt: Date;

  constructor(dto: IUserRoleRepositoryDto) {
    super();
    this.user_id = dto.user_id;
    this.role_id = dto.role_id;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
