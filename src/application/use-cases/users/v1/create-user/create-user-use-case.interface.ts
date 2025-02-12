import { HttpResponse } from 'src/infrastructure/http/HttpResponse';
import { User } from 'src/core/domain/user/user';
import { ICreateUserDto } from 'src/application/dtos/users/create-user-dto.interface';

export type CreateServiceHttpSuccessType = User | undefined;
export type CreateServiceHttpErrorType = string | any[];

export interface ICreateUserUseCase {
  execute(
    dto: ICreateUserDto,
  ): Promise<
    HttpResponse<CreateServiceHttpSuccessType, CreateServiceHttpErrorType>
  >;
}
