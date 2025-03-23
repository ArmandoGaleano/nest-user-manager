import { AbstractAutoSerializableClass } from '@/core/abstractions/base/auto-serializable-class.abstract';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/dtos/repositories/roles/search-roles-repository.dto.interface';

export abstract class AbstractSearchRolesRepositoryDto
  extends AbstractAutoSerializableClass<ISearchRolesRepositoryDto>
  implements ISearchRolesRepositoryDto
{
  abstract id?: ISearchRolesRepositoryDto['id'];
  abstract name?: ISearchRolesRepositoryDto['name'];
  abstract createdAt?: ISearchRolesRepositoryDto['createdAt'];
  abstract updatedAt?: ISearchRolesRepositoryDto['updatedAt'];
  abstract page?: ISearchRolesRepositoryDto['page'];
  abstract limit?: ISearchRolesRepositoryDto['limit'];
}
