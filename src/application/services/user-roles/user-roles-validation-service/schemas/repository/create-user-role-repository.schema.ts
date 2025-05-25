import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { DateSchema } from '@/core/schemas/@common/date.schema';

import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseCreateUserRoleRepositoryDtoSchema = z.object({
  user_id: new UuidSchema().schema,
  role_id: new UuidSchema().schema,
  createdAt: new DateSchema().schema,
  updatedAt: new DateSchema().schema,
});

export class CreateUserRoleRepositorySchema extends AbstractZodSchema {
  schema = baseCreateUserRoleRepositoryDtoSchema;
}
