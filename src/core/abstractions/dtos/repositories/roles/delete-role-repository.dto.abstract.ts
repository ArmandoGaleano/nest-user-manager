import { IDeleteRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/delete-role-repository.dto.interface';

export abstract class AbstractDeleteRoleRepositoryDto
  implements IDeleteRoleRepositoryDto
{
  abstract id: IDeleteRoleRepositoryDto['id'];
}
