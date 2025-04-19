import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';
import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';

export class ReadRoleRepositoryDto extends AbstractReadRoleRepositoryDto {
  get id() {
    return this._dto.id;
  }

  get name() {
    return this._dto.name;
  }

  constructor(private _dto: IReadRoleRepositoryDto) {
    super();
  }
}
