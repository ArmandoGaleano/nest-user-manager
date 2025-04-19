import { AbstractSearchUsersUseCase } from '@/core/abstractions/application/use-cases/users/search-users.use-case.abstract';
import { Either, left, Left, right } from '@/shared/either';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Injectable } from '@nestjs/common';
import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';
import { z } from 'zod';
import { SearchUsersRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository.dto';
import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository.dto.abstract';
import { AbstractSearchUsersRepositoryResultDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository-result.dto.abstract';

@Injectable()
export class SearchUsersUseCase extends AbstractSearchUsersUseCase {
  constructor(
    private readonly UsersRepositoryService: AbstractUsersRepositoryService,
    private readonly UserValidationService: AbstractUserValidationService,
  ) {
    super();
  }

  async execute(dto: AbstractSearchUsersRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractSearchUsersRepositoryResultDto
    >
  > {
    try {
      const eitherValidateSearchUsersResult =
        this.UserValidationService.validateSearchUsersSchema(dto);

      if (eitherValidateSearchUsersResult instanceof Left) {
        return eitherValidateSearchUsersResult;
      }

      const eitherSearchUsers = await this.UsersRepositoryService.searchUsers(
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
