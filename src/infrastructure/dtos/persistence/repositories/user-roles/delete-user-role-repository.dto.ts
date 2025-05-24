import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleRepositoryDto
  extends AbstractAutoSerializableClass<IUserRoleRepositoryDto>
  implements IUserRoleRepositoryDto
{
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

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role created at',
    example: '2000-01-01',
  })
  get createdAt() {
    return this._dto.createdAt;
  }

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User role updated at',
    example: '2000-01-01',
  })
  get updatedAt() {
    return this._dto.updatedAt;
  }

  constructor(private _dto: IUserRoleRepositoryDto) {
    super();
  }
}
