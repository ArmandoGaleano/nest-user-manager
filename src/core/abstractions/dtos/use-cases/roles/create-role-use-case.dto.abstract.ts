import { ICreateRoleUseCaseDto } from '@/core/interfaces/dtos/use-cases/roles/create-role-use-case.dto.interface';

export abstract class AbstractCreateRoleUseCaseDto
  implements ICreateRoleUseCaseDto
{
  abstract name: ICreateRoleUseCaseDto['name'];
  abstract description: ICreateRoleUseCaseDto['description'];
}
