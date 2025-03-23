import { AbstractAutoSerializableClass } from '@/core/abstractions/base/auto-serializable-class.abstract';
import type { IReadUserRepositoryDto } from '../../../../interfaces/dtos/repositories/users/read-user-repository.dto.interface';

export abstract class AbstractReadUserRepositoryDto
  extends AbstractAutoSerializableClass<IReadUserRepositoryDto>
  implements IReadUserRepositoryDto
{
  abstract id?: IReadUserRepositoryDto['id'];
  abstract email?: IReadUserRepositoryDto['email'];
}
