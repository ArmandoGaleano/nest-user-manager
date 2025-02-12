import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import {
  CreateServiceHttpErrorType,
  CreateServiceHttpSuccessType,
} from 'src/application/use-cases/users/v1/create-user/create-user-use-case.interface';
import { HttpResponse } from 'src/infrastructure/http/HttpResponse';

export interface IUsersV1Service {
  create(
    dto: CreateUserDto,
  ): Promise<
    HttpResponse<CreateServiceHttpSuccessType, CreateServiceHttpErrorType>
  >;
}
