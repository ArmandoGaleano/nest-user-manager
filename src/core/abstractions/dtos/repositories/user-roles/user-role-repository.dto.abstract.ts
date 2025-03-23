import { AbstractAutoSerializableClass } from '@/core/abstractions/base/auto-serializable-class.abstract';
import { IUserRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/user-roles/user-role-repository.dto.interface';

export abstract class AbstractUserRoleRepositoryDto
  extends AbstractAutoSerializableClass<IUserRoleRepositoryDto>
  implements IUserRoleRepositoryDto
{
  abstract user_id: string;
  abstract role_id: string;
  abstract createdAt: Date;
  abstract updatedAt: Date;
}
