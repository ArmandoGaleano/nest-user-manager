import { ApiProperty } from '@nestjs/swagger';

import { IDeleteUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';
import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';

export class DeleteUserRepositoryDto
  extends AbstractAutoSerializableClass<IDeleteUserRepositoryDto>
  implements IDeleteUserRepositoryDto
{
  @ApiProperty({
    type: 'string',
    description: 'User uuid',
    example: '123456789',
  })
  get id() {
    return this._dto.id;
  }

  constructor(private _dto: IDeleteUserRepositoryDto) {
    super();
  }
}
