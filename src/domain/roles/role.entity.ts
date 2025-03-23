import { AbstractRoleEntity } from '@/core/abstractions/entities/role.abstract';
import { IRoleEntity } from '@/core/interfaces/entities/roles/role.interface';

export class RoleEntity extends AbstractRoleEntity {
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(private props: IRoleEntity) {
    super();
  }
}
