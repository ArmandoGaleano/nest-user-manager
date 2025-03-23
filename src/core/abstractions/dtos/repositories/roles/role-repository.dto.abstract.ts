import { IRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/role-repository.dto.interface';

export abstract class AbstractRoleRepositoryDto implements IRoleRepositoryDto {
  abstract id: IRoleRepositoryDto['id'];
  abstract name: IRoleRepositoryDto['name'];
  abstract description: IRoleRepositoryDto['description'];
  abstract createdAt: IRoleRepositoryDto['createdAt'];
  abstract updatedAt: IRoleRepositoryDto['updatedAt'];
}
