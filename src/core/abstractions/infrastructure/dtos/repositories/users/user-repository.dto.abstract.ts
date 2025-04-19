import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/user-repository.dto.interface';

export abstract class AbstractUserRepositoryDto
  extends AbstractAutoSerializableClass<IUserRepositoryDto>
  implements IUserRepositoryDto
{
  abstract readonly id: IUserRepositoryDto['id'];
  abstract email: IUserRepositoryDto['email'];
  abstract firstName: IUserRepositoryDto['firstName'];
  abstract lastName: IUserRepositoryDto['lastName'];
  abstract birthdate: IUserRepositoryDto['birthdate'];
  abstract document: IUserRepositoryDto['document'];
  abstract documentType: IUserRepositoryDto['documentType'];
  abstract createdAt: IUserRepositoryDto['createdAt'];
  abstract updatedAt: IUserRepositoryDto['updatedAt'];
}
