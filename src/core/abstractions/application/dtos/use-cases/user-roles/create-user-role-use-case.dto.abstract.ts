import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { ICreateUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.interface';

export abstract class AbstractCreateUserRoleUseCaseDto
  extends AbstractAutoSerializableClass<ICreateUserRoleUseCaseDto>
  implements ICreateUserRoleUseCaseDto
{
  abstract user_id: string;
  abstract role_id: string;
}
