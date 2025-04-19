import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { ICreateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/create-user-use-case.dto.interface';

export abstract class AbstractCreateUserUseCaseDto
  extends AbstractAutoSerializableClass<ICreateUserUseCaseDto>
  implements ICreateUserUseCaseDto
{
  abstract email: ICreateUserUseCaseDto['email'];
  abstract password: ICreateUserUseCaseDto['password'];
  abstract firstName: ICreateUserUseCaseDto['firstName'];
  abstract lastName: ICreateUserUseCaseDto['lastName'];
  abstract birthdate: ICreateUserUseCaseDto['birthdate'];
  abstract document: ICreateUserUseCaseDto['document'];
  abstract documentType: ICreateUserUseCaseDto['documentType'];
  abstract roles: ICreateUserUseCaseDto['roles'];
}
