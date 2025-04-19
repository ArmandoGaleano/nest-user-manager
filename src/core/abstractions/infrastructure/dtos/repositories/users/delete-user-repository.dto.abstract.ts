import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IDeleteUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';

export abstract class AbstractDeleteUserRepositoryDto
  extends AbstractAutoSerializableClass<IDeleteUserRepositoryDto>
  implements IDeleteUserRepositoryDto
{
  abstract id: IDeleteUserRepositoryDto['id'];
}
