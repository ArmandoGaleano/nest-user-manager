import { IUserEntity } from '../../../interfaces/domain/entities/users/user.interface';
import { AbstractAutoSerializableClass } from '../../@base/auto-serializable-class.abstract';

export abstract class AbstractUserEntity
  extends AbstractAutoSerializableClass<IUserEntity>
  implements IUserEntity
{
  abstract readonly id: IUserEntity['id'];
  abstract email: IUserEntity['email'];
  abstract firstName: IUserEntity['firstName'];
  abstract lastName: IUserEntity['lastName'];
  abstract birthdate: IUserEntity['birthdate'];
  abstract roles: IUserEntity['roles'];
  abstract createdAt: IUserEntity['createdAt'];
  abstract updatedAt: IUserEntity['updatedAt'];
}
