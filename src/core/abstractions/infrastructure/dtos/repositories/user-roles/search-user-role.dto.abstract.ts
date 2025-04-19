import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { ISearchUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/search-user-role-repository.dto.interface';

export abstract class AbstractSearchUserRoleRepositoryDto
  extends AbstractAutoSerializableClass<ISearchUserRoleRepositoryDto>
  implements ISearchUserRoleRepositoryDto
{
  abstract user_id: ISearchUserRoleRepositoryDto['user_id'];
  abstract role_id: ISearchUserRoleRepositoryDto['role_id'];
  abstract createdAt: ISearchUserRoleRepositoryDto['createdAt'];
  abstract updatedAt: ISearchUserRoleRepositoryDto['updatedAt'];
  abstract createdAtStart: ISearchUserRoleRepositoryDto['createdAtStart'];
  abstract createdAtEnd: ISearchUserRoleRepositoryDto['createdAtEnd'];
  abstract updatedAtStart: ISearchUserRoleRepositoryDto['updatedAtStart'];
  abstract updatedAtEnd: ISearchUserRoleRepositoryDto['updatedAtEnd'];
  abstract page?: ISearchUserRoleRepositoryDto['page'];
  abstract limit?: ISearchUserRoleRepositoryDto['limit'];
}
