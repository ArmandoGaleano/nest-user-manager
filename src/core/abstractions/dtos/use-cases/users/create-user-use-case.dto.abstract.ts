import { ICreateUserUseCaseDto } from '@/core/interfaces/dtos/use-cases/users/create-user-use-case.dto.interface';

export abstract class AbstractCreateUserUseCaseDto
  implements ICreateUserUseCaseDto
{
  abstract email: ICreateUserUseCaseDto['email'];
  abstract password: ICreateUserUseCaseDto['password'];
  abstract firstName: ICreateUserUseCaseDto['firstName'];
  abstract lastName: ICreateUserUseCaseDto['lastName'];
  abstract birthdate: ICreateUserUseCaseDto['birthdate'];
  abstract document: ICreateUserUseCaseDto['document'];
  abstract documentType: ICreateUserUseCaseDto['documentType'];
  abstract roles: ICreateUserUseCaseDto['roles'];
}
