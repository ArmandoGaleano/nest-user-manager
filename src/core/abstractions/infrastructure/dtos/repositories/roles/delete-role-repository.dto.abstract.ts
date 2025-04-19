import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IDeleteRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/delete-role-repository.dto.interface';

export abstract class AbstractDeleteRoleRepositoryDto
  extends AbstractAutoSerializableClass<IDeleteRoleRepositoryDto>
  implements IDeleteRoleRepositoryDto
{
  abstract id: IDeleteRoleRepositoryDto['id'];
}
