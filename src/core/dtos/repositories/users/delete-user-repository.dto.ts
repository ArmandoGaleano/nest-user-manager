import { ApiProperty } from '@nestjs/swagger';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/delete-user-repository.dto.abstract';
import { IDeleteUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/delete-user-repository.dto.interface';

export class DeleteUserRepositoryDto extends AbstractDeleteUserRepositoryDto {
  @ApiProperty({
    type: 'string',
    description: 'User uuid',
    example: '123456789',
  })
  get id() {
    return this.dto.id;
  }

  constructor(private dto: IDeleteUserRepositoryDto) {
    super();
  }
}
