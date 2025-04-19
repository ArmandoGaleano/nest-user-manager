import { AbstractDeleteUserRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto.abstract';
import { IDeleteUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto.interface';

export class DeleteUserRoleUseCaseDto extends AbstractDeleteUserRoleUseCaseDto {
  get user_id() {
    return this._dto.user_id;
  }

  get role_id() {
    return this._dto.role_id;
  }

  constructor(private _dto: IDeleteUserRoleUseCaseDto) {
    super();
  }
}
