import { ICreateUserRoleRepositoryDto } from '@/core/interfaces/dtos/repositories/user-roles/create-user-role-repository.dto.interface copy';

export abstract class AbstractCreateUserRoleRepositoryDto
  implements ICreateUserRoleRepositoryDto
{
  abstract user_id: string;
  abstract role_id: string;
  abstract createdAt: Date;
  abstract updatedAt: Date;
}
