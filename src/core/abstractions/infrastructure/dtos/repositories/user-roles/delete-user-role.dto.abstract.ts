import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IDeleteUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/delete-user-role-repository.dto.interface';

export abstract class AbstractDeleteUserRoleRepositoryDto
  extends AbstractAutoSerializableClass<IDeleteUserRoleRepositoryDto>
  implements IDeleteUserRoleRepositoryDto
{
  abstract user_id: string;
  abstract role_id: string;
}
