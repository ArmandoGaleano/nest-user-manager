import { ISearchRolesRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/search-roles-repository.dto.interface';

export abstract class AbstractSearchRolesRepositoryDto
  implements ISearchRolesRepositoryDto
{
  abstract id?: ISearchRolesRepositoryDto['id'];
  abstract name?: ISearchRolesRepositoryDto['name'];
  abstract createdAt?: ISearchRolesRepositoryDto['createdAt'];
  abstract updatedAt?: ISearchRolesRepositoryDto['updatedAt'];
  abstract page?: ISearchRolesRepositoryDto['page'];
  abstract limit?: ISearchRolesRepositoryDto['limit'];
}
