import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { ICreateRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/roles/create-role-use-case.dto.interface';

export abstract class AbstractCreateRoleUseCaseDto
  extends AbstractAutoSerializableClass<ICreateRoleUseCaseDto>
  implements ICreateRoleUseCaseDto
{
  abstract name: ICreateRoleUseCaseDto['name'];
  abstract description: ICreateRoleUseCaseDto['description'];
}
