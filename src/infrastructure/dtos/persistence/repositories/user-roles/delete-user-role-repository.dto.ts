import { AbstractDeleteUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/delete-user-role.dto.abstract';
import { IUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleRepositoryDto extends AbstractDeleteUserRoleRepositoryDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'User id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  get user_id() {
    return this._dto.user_id;
  }

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Role id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  get role_id() {
    return this._dto.role_id;
  }

  constructor(private _dto: IUserRoleRepositoryDto) {
    super();
  }
}
