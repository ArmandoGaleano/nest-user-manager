import { AbstractAutoSerializableClass } from '@/core/abstractions/base/auto-serializable-class.abstract';
import type { ICreateUserRepositoryDto } from '../../../../interfaces/dtos/repositories/users/create-user-repository.dto.interface';

export abstract class AbstractCreateUserRepositoryDto
  extends AbstractAutoSerializableClass<ICreateUserRepositoryDto>
  implements ICreateUserRepositoryDto
{
  abstract id: ICreateUserRepositoryDto['id'];
  abstract email: ICreateUserRepositoryDto['email'];
  abstract password: ICreateUserRepositoryDto['password'];
  abstract firstName: ICreateUserRepositoryDto['firstName'];
  abstract lastName: ICreateUserRepositoryDto['lastName'];
  abstract birthdate: ICreateUserRepositoryDto['birthdate'];
  abstract document: ICreateUserRepositoryDto['document'];
  abstract documentType: ICreateUserRepositoryDto['documentType'];
  abstract createdAt: ICreateUserRepositoryDto['createdAt'];
  abstract updatedAt: ICreateUserRepositoryDto['updatedAt'];
}
