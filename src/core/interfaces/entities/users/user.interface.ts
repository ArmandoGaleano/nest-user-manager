import { AbstractRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/role-repository.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';

export interface IUserEntity {
  id: AbstractUserRepositoryDto['id'];
  email: AbstractUserRepositoryDto['email'];
  password: AbstractUserRepositoryDto['password'];
  firstName: AbstractUserRepositoryDto['firstName'];
  lastName: AbstractUserRepositoryDto['lastName'];
  birthdate: AbstractUserRepositoryDto['birthdate'];
  roles: AbstractRoleRepositoryDto[];
  createdAt: AbstractUserRepositoryDto['createdAt'];
  updatedAt: AbstractUserRepositoryDto['updatedAt'];
}
