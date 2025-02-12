import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/core/database-entities/user-model.interface';
import type { IReadUserDto } from './read-user-dto.interface';

export class ReadUserDto implements IReadUserDto {
  @ApiProperty({
    type: 'string',
    description: 'User id',
    example: 'ab4qf871454$f#%',
  })
  id: UserModel['id'];
  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User email',
    example: 'example@email.com',
  })
  email: UserModel['email'];
}
