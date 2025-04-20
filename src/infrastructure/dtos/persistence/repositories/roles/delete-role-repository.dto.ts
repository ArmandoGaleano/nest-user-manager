import { ApiProperty } from '@nestjs/swagger';

import { IDeleteRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/delete-role-repository.dto.interface';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';

export class DeleteRoleRepositoryDto extends AbstractDeleteRoleRepositoryDto {
  @ApiProperty({
    type: 'string',
    description: 'Role uuid',
    example: '123456789',
  })
  get id() {
    return this._dto.id;
  }

  constructor(private _dto: IDeleteRoleRepositoryDto) {
    super();
  }
}
