import { AbstractAutoSerializableClass } from '@/core/abstractions/base/auto-serializable-class.abstract';
import { IRepositoryRoleDto } from '@/core/interfaces/dtos/repositories/roles/read-role-repository.dto.interface';

export abstract class AbstractReadRoleRepositoryDto
  extends AbstractAutoSerializableClass<IRepositoryRoleDto>
  implements IRepositoryRoleDto
{
  abstract id?: IRepositoryRoleDto['id'];
  abstract name?: IRepositoryRoleDto['name'];
}
