import { IUpdateUserUseCaseDto } from '@/core/interfaces/dtos/use-cases/users/update-user-use-case.dto.interface';

export abstract class AbstractUpdateUserUseCaseDto
  implements IUpdateUserUseCaseDto
{
  abstract id: IUpdateUserUseCaseDto['id'];
  abstract password?: IUpdateUserUseCaseDto['password'];
  abstract firstName?: IUpdateUserUseCaseDto['firstName'];
  abstract lastName?: IUpdateUserUseCaseDto['lastName'];
  abstract birthdate?: IUpdateUserUseCaseDto['birthdate'];
  abstract document?: IUpdateUserUseCaseDto['document'];
  abstract documentType?: IUpdateUserUseCaseDto['documentType'];
}
