import { AbstractAutoSerializableClass } from '@/core/abstractions/base/auto-serializable-class.abstract';
import { ICreateUserRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/user-roles/create-user-role-repository.dto.interface copy';

export abstract class AbstractCreateUserRoleRepositoryDto
  extends AbstractAutoSerializableClass<ICreateUserRoleRepositoryDto>
  implements ICreateUserRoleRepositoryDto
{
  abstract user_id: string;
  abstract role_id: string;
  abstract createdAt: Date;
  abstract updatedAt: Date;
}
