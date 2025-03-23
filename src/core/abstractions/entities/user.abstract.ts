import { IUserEntity } from '../../interfaces/entities/users/user.interface';
import { AbstractRoleRepositoryDto } from '../dtos/repositories/roles/role-repository.dto.abstract';
import { AbstractUserRepositoryDto } from '../dtos/repositories/users/user-repository.dto.abstract';

export abstract class AbstractUserEntity implements IUserEntity {
  abstract readonly id: AbstractUserRepositoryDto['id'];
  abstract email: AbstractUserRepositoryDto['email'];
  abstract password: AbstractUserRepositoryDto['password'];
  abstract firstName: AbstractUserRepositoryDto['firstName'];
  abstract lastName: AbstractUserRepositoryDto['lastName'];
  abstract birthdate: AbstractUserRepositoryDto['birthdate'];
  abstract roles: AbstractRoleRepositoryDto[];
  abstract createdAt: AbstractUserRepositoryDto['createdAt'];
  abstract updatedAt: AbstractUserRepositoryDto['updatedAt'];
}
