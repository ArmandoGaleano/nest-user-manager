import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IUpdateUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/update-user-repository.dto.interface';

export abstract class AbstractUpdateUserRepositoryDto
  extends AbstractAutoSerializableClass<IUpdateUserRepositoryDto>
  implements IUpdateUserRepositoryDto
{
  abstract readonly id: IUpdateUserRepositoryDto['id'];
  abstract password: IUpdateUserRepositoryDto['password'];
  abstract firstName: IUpdateUserRepositoryDto['firstName'];
  abstract lastName: IUpdateUserRepositoryDto['lastName'];
  abstract birthdate: IUpdateUserRepositoryDto['birthdate'];
  abstract document: IUpdateUserRepositoryDto['document'];
  abstract documentType: IUpdateUserRepositoryDto['documentType'];
  abstract updatedAt: IUpdateUserRepositoryDto['updatedAt'];
}
