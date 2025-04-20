import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';

import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseCreateUserRoleUseCaseDtoSchema = z.object({
  user_id: new UuidSchema().schema,
  role_id: new UuidSchema().schema,
});

export class CreateUserRoleUseCaseSchema extends AbstractZodSchema {
  schema = baseCreateUserRoleUseCaseDtoSchema;
}
