import { ISearchUsersRepositoryDto } from '@/core/interfaces/dtos/repositories/users/search-users-repository.dto.interface';

export abstract class AbstractSearchUsersRepositoryDto
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
  abstract updatedAt?: ISearchUsersRepositoryDto['updatedAt'];
  abstract roles?: ISearchUsersRepositoryDto['roles'];
  abstract page?: ISearchUsersRepositoryDto['page'];
  abstract limit?: ISearchUsersRepositoryDto['limit'];
}
