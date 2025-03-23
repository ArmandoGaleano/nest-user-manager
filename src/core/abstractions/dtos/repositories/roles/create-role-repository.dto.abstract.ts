import type { ICreateRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/create-role-repository.dto.interface';

export abstract class AbstractCreateRoleRepositoryDto
  implements ICreateRoleRepositoryDto
{
  abstract id: ICreateRoleRepositoryDto['id'];
  abstract name: ICreateRoleRepositoryDto['name'];
  abstract description: ICreateRoleRepositoryDto['description'];
  abstract createdAt: ICreateRoleRepositoryDto['createdAt'];
  abstract updatedAt: ICreateRoleRepositoryDto['updatedAt'];
}
