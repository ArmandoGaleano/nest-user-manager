import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/search-roles-repository.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SearchRolesRepositoryDto extends AbstractSearchRolesRepositoryDto {
  @ApiProperty({
    type: 'string',
    description: 'Role uuid',
    example: 'f7b3b2b0-4b7b-4b7b-8b7b-4b7b7b7b7b7b',
  })
  get id() {
    return this._dto.id;
  }

  @ApiProperty({
    type: 'string',
    enum: ['admin', 'customer'],
    description: 'Role name',
    example: 'customer',
  })
  get name() {
    return this._dto.name;
  }

  @ApiProperty({
    type: 'string',
    description: 'Role creation date',
    example: '2021-09-01T00:00:00Z',
  })
  get createdAt() {
    return this._dto.createdAt;
  }

  @ApiProperty({
    type: 'string',
    description: 'Role last update date',
    example: '2021-09-01T00:00:00Z',
  })
  get updatedAt() {
    return this._dto.updatedAt;
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

  constructor(private _dto: ISearchRolesRepositoryDto) {
    super();
  }
}
