import type { IDeleteUserRepositoryDto } from '../../../../interfaces/dtos/repositories/users/delete-user-repository.dto.interface';

export abstract class AbstractDeleteUserRepositoryDto
  implements IDeleteUserRepositoryDto
{
  abstract id: IDeleteUserRepositoryDto['id'];
}
