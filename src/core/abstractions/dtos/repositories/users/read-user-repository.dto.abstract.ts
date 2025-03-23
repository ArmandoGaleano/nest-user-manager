import type { IReadUserRepositoryDto } from '../../../../interfaces/dtos/repositories/users/read-user-repository.dto.interface';

export abstract class AbstractReadUserRepositoryDto
  implements IReadUserRepositoryDto
{
  abstract id?: IReadUserRepositoryDto['id'];
  abstract email?: IReadUserRepositoryDto['email'];
}
