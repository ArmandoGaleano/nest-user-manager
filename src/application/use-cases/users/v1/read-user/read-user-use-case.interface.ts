import { HttpResponse } from 'src/infrastructure/http/HttpResponse';
import { IUser } from 'src/core/domain/user/user.interface';
import { IReadUserDto } from 'src/application/dtos/users/read-user-dto.interface';

export type ReadServiceHttpSuccessType = IUser | undefined;
export type ReadServiceHttpErrorType = string | any[];

export interface IReadUserUseCase {
  execute(
    dto: IReadUserDto,
  ): Promise<
    HttpResponse<ReadServiceHttpSuccessType, ReadServiceHttpErrorType>
  >;
}
