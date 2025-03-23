import { IRepositoryRoleDto } from '@/core/interfaces/dtos/repositories/roles/read-role-repository.dto.interface';

export abstract class AbstractReadRoleRepositoryDto
  implements IRepositoryRoleDto
{
  abstract id?: IRepositoryRoleDto['id'];
  abstract name?: IRepositoryRoleDto['name'];
}
