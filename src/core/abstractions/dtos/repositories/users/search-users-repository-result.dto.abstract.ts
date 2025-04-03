import { AbstractAutoSerializableClass } from '@/core/abstractions/base/auto-serializable-class.abstract';
import { ISearchUsersRepositoryResultDto } from '@/core/interfaces/dtos/repositories/users/search-users-repository-result.dto.interface';

export abstract class AbstractSearchUsersRepositoryResultDto
  extends AbstractAutoSerializableClass<ISearchUsersRepositoryResultDto>
  implements ISearchUsersRepositoryResultDto
{
  abstract id?: ISearchUsersRepositoryResultDto['id'];
  abstract email?: ISearchUsersRepositoryResultDto['email'];
  abstract firstName?: ISearchUsersRepositoryResultDto['firstName'];
  abstract lastName?: ISearchUsersRepositoryResultDto['lastName'];
  abstract birthdate?: ISearchUsersRepositoryResultDto['birthdate'];
  abstract document?: ISearchUsersRepositoryResultDto['document'];
  abstract documentType?: ISearchUsersRepositoryResultDto['documentType'];
  abstract createdAt?: ISearchUsersRepositoryResultDto['createdAt'];
  abstract updatedAt?: ISearchUsersRepositoryResultDto['updatedAt'];
  abstract page?: ISearchUsersRepositoryResultDto['page'];
  abstract limit?: ISearchUsersRepositoryResultDto['limit'];
}
