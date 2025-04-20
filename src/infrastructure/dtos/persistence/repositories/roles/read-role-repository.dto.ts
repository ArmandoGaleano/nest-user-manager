import { ApiProperty } from '@nestjs/swagger';

import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';

export class ReadRoleRepositoryDto extends AbstractReadRoleRepositoryDto {
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

  constructor(private _dto: IReadRoleRepositoryDto) {
    super();
  }
}
