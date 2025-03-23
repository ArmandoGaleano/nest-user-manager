import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/read-role-repository.dto.abstract';
import { IRepositoryRoleDto } from '@/core/interfaces/dtos/repositories/roles/read-role-repository.dto.interface';

export class ReadRoleRepositoryDto extends AbstractReadRoleRepositoryDto {
  get id() {
    return this.dto.id;
  }

  get name() {
    return this.dto.name;
  }

  constructor(private dto: IRepositoryRoleDto) {
    super();
  }
}
