import { IRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/role-repository.dto.interface';
import { IUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/user-repository.dto.interface';

export interface IUserEntity {
  id: IUserRepositoryDto['id'];
  email: IUserRepositoryDto['email'];
  firstName: IUserRepositoryDto['firstName'];
  lastName: IUserRepositoryDto['lastName'];
  birthdate: IUserRepositoryDto['birthdate'];
  roles: IRoleRepositoryDto[];
  createdAt: IUserRepositoryDto['createdAt'];
  updatedAt: IUserRepositoryDto['updatedAt'];
}
