import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';

import { RoleDescriptionSchema } from '@/core/schemas/@common/roles/role-description.schema';
import { RoleNameSchema } from '@/core/schemas/@common/roles/role-name.schema';
import { UpdatedAtSchema } from '@/core/schemas/@common/updated-at.schema';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseUpdateRoleDtoSchema = z
  .object({
    id: new UuidSchema().schema,
    name: new RoleNameSchema().schema.optional(),
    description: new RoleDescriptionSchema().schema.optional(),
    updatedAt: new UpdatedAtSchema().schema,
  })
  .refine(
    (data) => {
      return !(data.name === undefined && data.description === undefined);
    },
    {
      message: 'You need to provide the name or description',
    },
  );

export class UpdateRoleRepositoryDtoSchema extends AbstractZodSchema {
  schema = baseUpdateRoleDtoSchema;
}
