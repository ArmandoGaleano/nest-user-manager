import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';
import { ISearchUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/search-user-role-repository.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SearchUserRoleRepositoryDto extends AbstractSearchUserRoleRepositoryDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'User id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  get user_id() {
    return this._dto.user_id;
  }

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Role id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  get role_id() {
    return this._dto.role_id;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role created at',
    example: '2000-01-01',
  })
  get createdAt() {
    return this._dto.createdAt;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role created start at',
    example: '2000-01-01',
  })
  get createdAtStart() {
    return this._dto.createdAtStart;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role created end at',
    example: '2000-01-01',
  })
  get createdAtEnd() {
    return this._dto.createdAtEnd;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role updated at',
    example: '2000-01-01',
  })
  get updatedAt() {
    return this._dto.updatedAt;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role updated start at',
    example: '2000-01-01',
  })
  get updatedAtStart() {
    return this._dto.updatedAtStart;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role updated end at',
    example: '2000-01-01',
  })
  get updatedAtEnd() {
    return this._dto.updatedAtEnd;
  }

  @ApiProperty({
    type: 'number',
    description: 'Page number',
    example: 1,
  })
  get page() {
    return this._dto.page;
  }
  @ApiProperty({
    type: 'number',
    description: 'Number of items per page',
    example: 10,
  })
  get limit() {
    return this._dto.limit;
  }

  constructor(private _dto: ISearchUserRoleRepositoryDto) {
    super();
  }
}
