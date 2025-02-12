import { Injectable } from '@nestjs/common';
import { IUsersV1Service } from './user-service.interface';
import { HttpResponse } from 'src/infrastructure/http/HttpResponse';
import { CreateUserUseCase } from 'src/application/use-cases/users/v1/create-user/create-user-use-case';
import { ReadUserUseCase } from 'src/application/use-cases/users/v1/read-user/read-user-use-case';
import type {
  CreateServiceHttpErrorType,
  CreateServiceHttpSuccessType,
} from 'src/application/use-cases/users/v1/create-user/create-user-use-case.interface';
import type { ICreateUserDto } from 'src/application/dtos/users/create-user-dto.interface';
import type { IReadUserDto } from 'src/application/dtos/users/read-user-dto.interface';
import type {
  ReadServiceHttpErrorType,
  ReadServiceHttpSuccessType,
} from 'src/application/use-cases/users/v1/read-user/read-user-use-case.interface';

@Injectable()
export class UsersV1Service implements IUsersV1Service {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly readUserUseCase: ReadUserUseCase,
  ) {}

  public create(
    dto: ICreateUserDto,
  ): Promise<
    HttpResponse<CreateServiceHttpSuccessType, CreateServiceHttpErrorType>
  > {
    return this.createUserUseCase.execute(dto);
  }
  public read(
    dto: IReadUserDto,
  ): Promise<
    HttpResponse<ReadServiceHttpSuccessType, ReadServiceHttpErrorType>
  > {
    return this.readUserUseCase.execute(dto);
  }
}
