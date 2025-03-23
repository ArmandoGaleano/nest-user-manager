import { IUpdateRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/update-role-repository.dto.interface';

export abstract class AbstractUpdateRoleRepositoryDto
  implements IUpdateRoleRepositoryDto
{
  abstract id: IUpdateRoleRepositoryDto['id'];
  abstract name?: IUpdateRoleRepositoryDto['name'];
  abstract description?: IUpdateRoleRepositoryDto['description'];
  abstract updatedAt: IUpdateRoleRepositoryDto['updatedAt'];
}
