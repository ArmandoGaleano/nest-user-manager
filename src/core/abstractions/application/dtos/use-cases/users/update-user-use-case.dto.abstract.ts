import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IUpdateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/update-user-use-case.dto.interface';

export abstract class AbstractUpdateUserUseCaseDto
  extends AbstractAutoSerializableClass<IUpdateUserUseCaseDto>
  implements IUpdateUserUseCaseDto
{
  abstract id: IUpdateUserUseCaseDto['id'];
  abstract password?: IUpdateUserUseCaseDto['password'];
  abstract firstName?: IUpdateUserUseCaseDto['firstName'];
  abstract lastName?: IUpdateUserUseCaseDto['lastName'];
  abstract birthdate?: IUpdateUserUseCaseDto['birthdate'];
  abstract document?: IUpdateUserUseCaseDto['document'];
  abstract documentType?: IUpdateUserUseCaseDto['documentType'];
}
