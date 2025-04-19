import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IReadUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/read-user-repository.dto.interface';

export abstract class AbstractReadUserRepositoryDto
  extends AbstractAutoSerializableClass<IReadUserRepositoryDto>
  implements IReadUserRepositoryDto
{
  abstract id?: IReadUserRepositoryDto['id'];
  abstract email?: IReadUserRepositoryDto['email'];
}
