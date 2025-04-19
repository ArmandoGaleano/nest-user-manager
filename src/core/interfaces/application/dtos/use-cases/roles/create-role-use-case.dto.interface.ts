import { ICreateRoleRepositoryDto } from '../../../../infrastructure/dtos/repositories/roles/create-role-repository.dto.interface';

export type ICreateRoleUseCaseDto = Omit<
  ICreateRoleRepositoryDto,
  'id' | 'createdAt' | 'updatedAt'
>;
