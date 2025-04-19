import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { CreatedAtSchema } from '@/core/schemas/@common/created-at.schema';
import { UpdatedAtSchema } from '@/core/schemas/@common/updated-at.schema';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';
import { z } from 'zod';

const baseCreateUserRoleRepositoryDtoSchema = z.object({
  user_id: new UuidSchema().schema,
  role_id: new UuidSchema().schema,
  createdAt: new CreatedAtSchema().schema,
  updatedAt: new UpdatedAtSchema().schema,
});

export class CreateUserRoleRepositorySchema extends AbstractZodSchema {
  schema = baseCreateUserRoleRepositoryDtoSchema;
}
