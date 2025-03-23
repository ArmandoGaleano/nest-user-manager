import { IValidateCreateUserDto } from '@/core/interfaces/dtos/services/users/user-validation-service/validate-create-user.dto.interface';

export abstract class AbstractValidateCreateUserDto
  implements IValidateCreateUserDto
{
  abstract readonly id: IValidateCreateUserDto['id'];
  abstract email: IValidateCreateUserDto['email'];
  abstract password: IValidateCreateUserDto['password'];
  abstract firstName: IValidateCreateUserDto['firstName'];
  abstract lastName: IValidateCreateUserDto['lastName'];
  abstract birthdate: IValidateCreateUserDto['birthdate'];
  abstract document: IValidateCreateUserDto['document'];
  abstract documentType: IValidateCreateUserDto['documentType'];
  abstract createdAt: IValidateCreateUserDto['createdAt'];
  abstract updatedAt: IValidateCreateUserDto['updatedAt'];
  abstract roles: IValidateCreateUserDto['roles'];
}
