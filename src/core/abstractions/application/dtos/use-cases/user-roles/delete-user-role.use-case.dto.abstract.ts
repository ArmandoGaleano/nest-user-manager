import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IDeleteUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto.interface';

export abstract class AbstractDeleteUserRoleUseCaseDto
  extends AbstractAutoSerializableClass<IDeleteUserRoleUseCaseDto>
  implements IDeleteUserRoleUseCaseDto
{
  abstract user_id: string;
  abstract role_id: string;
}
