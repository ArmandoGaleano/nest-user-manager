import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/repositories/users.repository.service.abstract';
import { AbstractSearchUsersUseCase } from '@/core/abstractions/use-cases/users/search-users.use-case.abstract';
import { Either, Left, right } from '@/shared/either';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Injectable } from '@nestjs/common';
import { AbstractUserValidationService } from '@/core/abstractions/services/users/user-validation.service.abstract';
import { z } from 'zod';
import { SearchUsersRepositoryDto } from '@/core/dtos/repositories/users/search-users-repository.dto';
import { AbstractSearchUsersRepositoryResultDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository-result.dto.abstract';

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
      AbstractSearchUsersRepositoryResultDto[]
    >
  > {
    const eitherValidateSearchUsersResult =
      this.UserValidationService.validateSearchUsersSchema(dto);

    if (eitherValidateSearchUsersResult instanceof Left) {
      return eitherValidateSearchUsersResult;
    }

    const eitherSearchUsers = await this.UsersRepositoryService.searchUsers(
      new SearchUsersRepositoryDto(eitherValidateSearchUsersResult.value),
    );

    if (eitherSearchUsers instanceof Left) {
      return eitherSearchUsers;
    }

    return right(eitherSearchUsers.value);
  }
}
