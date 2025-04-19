import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { CreatedAtSchema } from '@/core/schemas/@common/created-at.schema';
import { RoleDescriptionSchema } from '@/core/schemas/@common/roles/role-description.schema';
import { RoleNameSchema } from '@/core/schemas/@common/roles/role-name.schema';
import { UpdatedAtSchema } from '@/core/schemas/@common/updated-at.schema';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';
import { z } from 'zod';

const baseCreateRoleDtoSchema = z.object({
  id: new UuidSchema().schema,
  name: new RoleNameSchema().schema,
  description: new RoleDescriptionSchema().schema,
  createdAt: new CreatedAtSchema().schema,
  updatedAt: new UpdatedAtSchema().schema,
});
export class CreateRoleRepositoryDtoSchema extends AbstractZodSchema {
  schema = baseCreateRoleDtoSchema;
}
