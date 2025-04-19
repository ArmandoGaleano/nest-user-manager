import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { ISearchUsersRepositoryResultDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/search-users-repository-result.dto.interface';

export abstract class AbstractSearchUsersRepositoryResultDto
  extends AbstractAutoSerializableClass<ISearchUsersRepositoryResultDto>
  implements ISearchUsersRepositoryResultDto
{
  abstract data: ISearchUsersRepositoryResultDto['data'];
  abstract page: ISearchUsersRepositoryResultDto['page'];
  abstract limit: ISearchUsersRepositoryResultDto['limit'];
  abstract total: ISearchUsersRepositoryResultDto['total'];
}
