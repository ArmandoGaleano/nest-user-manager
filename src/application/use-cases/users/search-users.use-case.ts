import { Injectable } from '@nestjs/common';

import { SearchUsersRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository.dto';

import { Either, left, Left, right } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';
import { SearchUsersRepositoryResultDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository-result.dto';
import { ISearchUsersUseCase } from '@/core/interfaces/application/use-cases/users/search-users.use-case.interface';
@Injectable()
export class SearchUsersUseCase implements ISearchUsersUseCase {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly userValidationService: UserValidationService,
  ) {}

  async execute(dto: SearchUsersRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      SearchUsersRepositoryResultDto
    >
  > {
    try {
      const eitherValidateSearchUsersResult =
        this.userValidationService.validateSearchUsersSchema(dto);

      if (eitherValidateSearchUsersResult instanceof Left) {
        return eitherValidateSearchUsersResult;
      }

      const eitherSearchUsers = await this.usersRepositoryService.searchUsers(
        new SearchUsersRepositoryDto(eitherValidateSearchUsersResult.value),
      );

      if (eitherSearchUsers instanceof Left) {
        throw eitherSearchUsers.value;
      }

      return right(eitherSearchUsers.value);
    } catch (error) {
      console.error('Error on SearchUsersUseCase');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
