import { ApiProperty } from '@nestjs/swagger';

import { IReadUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/read-user-repository.dto.interface';
import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';

export class ReadUserRepositoryDto
  extends AbstractAutoSerializableClass<IReadUserRepositoryDto>
  implements IReadUserRepositoryDto
{
  @ApiProperty({
    type: 'string',
    description: 'User id',
    example: 'ab4qf871454$f#%',
  })
  get id() {
    return this._dto.id;
  }

  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User email',
    example: 'example@email.com',
  })
  get email() {
    return this._dto.email;
  }

  constructor(private _dto: IReadUserRepositoryDto) {
    super();
  }
}
