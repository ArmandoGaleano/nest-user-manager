import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import type { ICreateRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/create-role-repository.dto.interface';

export abstract class AbstractCreateRoleRepositoryDto
  extends AbstractAutoSerializableClass<ICreateRoleRepositoryDto>
  implements ICreateRoleRepositoryDto
{
  abstract id: ICreateRoleRepositoryDto['id'];
  abstract name: ICreateRoleRepositoryDto['name'];
  abstract description: ICreateRoleRepositoryDto['description'];
  abstract createdAt: ICreateRoleRepositoryDto['createdAt'];
  abstract updatedAt: ICreateRoleRepositoryDto['updatedAt'];
}
