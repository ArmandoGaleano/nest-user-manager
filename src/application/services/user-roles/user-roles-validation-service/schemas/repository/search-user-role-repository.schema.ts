import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';

import { LimitSchema } from '@/core/schemas/@common/limit.schema';
import { PageNumberSchema } from '@/core/schemas/@common/page-number.schema';
import { TimestampSchema } from '@/core/schemas/@common/timestamp.schema';

import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseSearchUserRoleRepositoryDtoSchema = z.object({
  user_id: new UuidSchema().schema.optional(),
  role_id: new UuidSchema().schema.optional(),
  createdAt: new TimestampSchema().schema.optional(),
  createdAtStart: new TimestampSchema().schema.optional(),
  createdAtEnd: new TimestampSchema().schema.optional(),
  updatedAt: new TimestampSchema().schema.optional(),
  updatedAtStart: new TimestampSchema().schema.optional(),
  updatedAtEnd: new TimestampSchema().schema.optional(),
  page: new PageNumberSchema().schema.optional(),
  limit: new LimitSchema().schema.optional(),
});

export class SearchUserRoleRepositorySchema extends AbstractZodSchema {
  schema = baseSearchUserRoleRepositoryDtoSchema;
}
