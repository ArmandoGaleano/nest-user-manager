import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { TimestampSchema } from '@/core/schemas/@common/timestamp.schema';

import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseCreateUserRoleRepositoryDtoSchema = z.object({
  user_id: new UuidSchema().schema,
  role_id: new UuidSchema().schema,
  createdAt: new TimestampSchema().schema,
  updatedAt: new TimestampSchema().schema,
});

export class CreateUserRoleRepositorySchema extends AbstractZodSchema {
  schema = baseCreateUserRoleRepositoryDtoSchema;
}
