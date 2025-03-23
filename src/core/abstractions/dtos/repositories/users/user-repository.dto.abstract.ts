import { IUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/user-repository.dto.interface';

export abstract class AbstractUserRepositoryDto implements IUserRepositoryDto {
  abstract readonly id: IUserRepositoryDto['id'];
  abstract email: IUserRepositoryDto['email'];
  abstract password: IUserRepositoryDto['password'];
  abstract firstName: IUserRepositoryDto['firstName'];
  abstract lastName: IUserRepositoryDto['lastName'];
  abstract birthdate: IUserRepositoryDto['birthdate'];
  abstract document: IUserRepositoryDto['document'];
  abstract documentType: IUserRepositoryDto['documentType'];
  abstract createdAt: IUserRepositoryDto['createdAt'];
  abstract updatedAt: IUserRepositoryDto['updatedAt'];
}
