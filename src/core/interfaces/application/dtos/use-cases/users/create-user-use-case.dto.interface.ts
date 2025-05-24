import { ICreateUserRepositoryDto } from '../../../../infrastructure/dtos/repositories/users/create-user-repository.dto.interface';

export type ICreateUserUseCaseDto = Omit<
  ICreateUserRepositoryDto,
  'id' | 'createdAt' | 'updatedAt'
> & {
  roleNames: string[];
};
