import { IRoleRepositoryDto } from '../../../../infrastructure/dtos/repositories/roles/role-repository.dto.interface';
import { ICreateUserRepositoryDto } from '../../../../infrastructure/dtos/repositories/users/create-user-repository.dto.interface';

export type ICreateUserUseCaseDto = Omit<
  ICreateUserRepositoryDto,
  'id' | 'createdAt' | 'updatedAt'
> & {
  roles: Array<IRoleRepositoryDto['name']>;
};
