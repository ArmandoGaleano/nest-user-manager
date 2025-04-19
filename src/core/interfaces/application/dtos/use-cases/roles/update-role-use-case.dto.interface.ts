import { IUpdateRoleRepositoryDto } from '../../../../infrastructure/dtos/repositories/roles/update-role-repository.dto.interface';

export type IUpdateRoleUseCaseDto = Optional<
  Omit<IUpdateRoleRepositoryDto, 'createdAt' | 'updatedAt'>,
  'name' | 'description'
>;
