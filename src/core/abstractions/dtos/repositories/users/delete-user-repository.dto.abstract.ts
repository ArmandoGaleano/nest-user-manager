import { AbstractAutoSerializableClass } from '@/core/abstractions/base/auto-serializable-class.abstract';
import type { IDeleteUserRepositoryDto } from '../../../../interfaces/dtos/repositories/users/delete-user-repository.dto.interface';

export abstract class AbstractDeleteUserRepositoryDto
  extends AbstractAutoSerializableClass<IDeleteUserRepositoryDto>
  implements IDeleteUserRepositoryDto
{
  abstract id: IDeleteUserRepositoryDto['id'];
}
