import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IUpdateRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/update-role-repository.dto.interface';

export abstract class AbstractUpdateRoleRepositoryDto
  extends AbstractAutoSerializableClass<IUpdateRoleRepositoryDto>
  implements IUpdateRoleRepositoryDto
{
  abstract id: IUpdateRoleRepositoryDto['id'];
  abstract name?: IUpdateRoleRepositoryDto['name'];
  abstract description?: IUpdateRoleRepositoryDto['description'];
  abstract updatedAt: IUpdateRoleRepositoryDto['updatedAt'];
}
