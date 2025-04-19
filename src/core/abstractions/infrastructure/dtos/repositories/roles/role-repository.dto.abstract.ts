import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/role-repository.dto.interface';

export abstract class AbstractRoleRepositoryDto
  extends AbstractAutoSerializableClass<IRoleRepositoryDto>
  implements IRoleRepositoryDto
{
  abstract id: IRoleRepositoryDto['id'];
  abstract name: IRoleRepositoryDto['name'];
  abstract description: IRoleRepositoryDto['description'];
  abstract createdAt: IRoleRepositoryDto['createdAt'];
  abstract updatedAt: IRoleRepositoryDto['updatedAt'];
}
