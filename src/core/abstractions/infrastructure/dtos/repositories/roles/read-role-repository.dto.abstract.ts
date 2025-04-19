import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';

export abstract class AbstractReadRoleRepositoryDto
  extends AbstractAutoSerializableClass<IReadRoleRepositoryDto>
  implements IReadRoleRepositoryDto
{
  abstract id?: IReadRoleRepositoryDto['id'];
  abstract name?: IReadRoleRepositoryDto['name'];
}
