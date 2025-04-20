import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';

import { RoleNameSchema } from '@/core/schemas/@common/roles/role-name.schema';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseReadRoleDtoSchema = z
  .object({
    id: new UuidSchema().schema.optional(),
    name: new RoleNameSchema().schema.optional(),
  })
  .refine((data) => data.id !== undefined || data.name !== undefined, {
    message: 'You need to provide your ID or name.',
  });

export class ReadRoleRepositoryDtoSchema extends AbstractZodSchema {
  schema = baseReadRoleDtoSchema;
}
