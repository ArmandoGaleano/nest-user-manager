import { ApiProperty } from '@nestjs/swagger';

import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';
import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';

export class ReadRoleRepositoryDto
  extends AbstractAutoSerializableClass<IReadRoleRepositoryDto>
  implements IReadRoleRepositoryDto
{
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
