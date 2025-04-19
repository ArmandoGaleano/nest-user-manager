import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { ISearchUsersRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/search-users-repository.dto.interface';

export abstract class AbstractSearchUsersRepositoryDto
  extends AbstractAutoSerializableClass<ISearchUsersRepositoryDto>
  implements ISearchUsersRepositoryDto
{
  abstract id?: ISearchUsersRepositoryDto['id'];
  abstract email?: ISearchUsersRepositoryDto['email'];
  abstract firstName?: ISearchUsersRepositoryDto['firstName'];
  abstract lastName?: ISearchUsersRepositoryDto['lastName'];
  abstract birthdate?: ISearchUsersRepositoryDto['birthdate'];
  abstract document?: ISearchUsersRepositoryDto['document'];
  abstract documentType?: ISearchUsersRepositoryDto['documentType'];
  abstract createdAt?: ISearchUsersRepositoryDto['createdAt'];
  abstract createdAtStart?: ISearchUsersRepositoryDto['createdAtStart'];
  abstract createdAtEnd?: ISearchUsersRepositoryDto['createdAtEnd'];
  abstract updatedAt?: ISearchUsersRepositoryDto['updatedAt'];
  abstract updatedAtStart?: ISearchUsersRepositoryDto['updatedAtStart'];
  abstract updatedAtEnd?: ISearchUsersRepositoryDto['updatedAtEnd'];
  abstract roles?: ISearchUsersRepositoryDto['roles'];
  abstract page?: ISearchUsersRepositoryDto['page'];
  abstract limit?: ISearchUsersRepositoryDto['limit'];
}
