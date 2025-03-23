import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/delete-role-repository.dto.abstract';
import { IDeleteRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/delete-role-repository.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleDto extends AbstractDeleteRoleRepositoryDto {
  @ApiProperty({
    type: 'string',
    description: 'Role uuid',
    example: '123456789',
  })
  get id() {
    return this.dto.id;
  }

  constructor(private dto: IDeleteRoleRepositoryDto) {
    super();
  }
}
