import { ApiProperty } from '@nestjs/swagger';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/read-user-repository.dto.abstract';
import { IReadUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/read-user-repository.dto.interface';

export class ReadUserRepositoryDto extends AbstractReadUserRepositoryDto {
  @ApiProperty({
    type: 'string',
    description: 'User id',
    example: 'ab4qf871454$f#%',
  })
  get id() {
    return this.dto.id;
  }

  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User email',
    example: 'example@email.com',
  })
  get email() {
    return this.dto.email;
  }

  constructor(private dto: IReadUserRepositoryDto) {
    super();
  }
}
