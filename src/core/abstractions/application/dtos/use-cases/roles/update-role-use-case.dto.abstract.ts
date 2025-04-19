import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IUpdateRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/roles/update-role-use-case.dto.interface';

export abstract class AbstractUpdateRoleUseCaseDto
  extends AbstractAutoSerializableClass<IUpdateRoleUseCaseDto>
  implements IUpdateRoleUseCaseDto
{
  abstract id: IUpdateRoleUseCaseDto['id'];
  abstract name: IUpdateRoleUseCaseDto['name'];
  abstract description: IUpdateRoleUseCaseDto['description'];
}
