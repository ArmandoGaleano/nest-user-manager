import { IUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/user-repository.dto.interface';
import { RoleEntity } from '@/domain/role/entities/role.entity';
import { Uuid } from '@/shared/value-objects/Uuid';
import { Email } from '@/shared/value-objects/Email';
import { FirstName } from '../value-objects/FirstName';
import { LastName } from '../value-objects/LastName';
import { Birthdate } from '../value-objects/Birthdate';

export interface IUserEntity {
  id: Uuid;
  email: Email;
  firstName: FirstName;
  lastName: LastName;
  birthdate: Birthdate;
  roles: RoleEntity[];
  createdAt: IUserRepositoryDto['createdAt'];
  updatedAt: IUserRepositoryDto['updatedAt'];
}
