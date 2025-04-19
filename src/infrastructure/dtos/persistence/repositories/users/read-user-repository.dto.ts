import { ApiProperty } from '@nestjs/swagger';

import { IReadUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/read-user-repository.dto.interface';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/read-user-repository.dto.abstract';

export class ReadUserRepositoryDto extends AbstractReadUserRepositoryDto {
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
