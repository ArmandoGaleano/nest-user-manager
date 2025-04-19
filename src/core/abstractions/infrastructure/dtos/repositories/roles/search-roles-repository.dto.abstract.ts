import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';

export abstract class AbstractSearchRolesRepositoryDto
  extends AbstractAutoSerializableClass<ISearchRolesRepositoryDto>
  implements ISearchRolesRepositoryDto
{
  abstract id?: ISearchRolesRepositoryDto['id'];
  abstract name?: ISearchRolesRepositoryDto['name'];
  abstract page?: ISearchRolesRepositoryDto['page'];
  abstract limit?: ISearchRolesRepositoryDto['limit'];
  abstract createdAt?: ISearchRolesRepositoryDto['createdAt'];
  abstract createdAtStart?: ISearchRolesRepositoryDto['createdAtStart'];
  abstract createdAtEnd?: ISearchRolesRepositoryDto['createdAtEnd'];
  abstract updatedAt?: ISearchRolesRepositoryDto['updatedAt'];
  abstract updatedAtStart?: ISearchRolesRepositoryDto['updatedAtStart'];
  abstract updatedAtEnd?: ISearchRolesRepositoryDto['updatedAtEnd'];
  abstract enableExactSearch?: ISearchRolesRepositoryDto['enableExactSearch'];
}
