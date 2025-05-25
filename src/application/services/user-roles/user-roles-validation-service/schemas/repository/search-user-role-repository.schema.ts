import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { DateSchema } from '@/core/schemas/@common/date.schema';

import { LimitSchema } from '@/core/schemas/@common/limit.schema';
import { PageNumberSchema } from '@/core/schemas/@common/page-number.schema';

import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseSearchUserRoleRepositoryDtoSchema = z.object({
  user_id: new UuidSchema().schema.optional(),
  role_id: new UuidSchema().schema.optional(),
  createdAt: new DateSchema().schema.optional(),
  createdAtStart: new DateSchema().schema.optional(),
  createdAtEnd: new DateSchema().schema.optional(),
  updatedAt: new DateSchema().schema.optional(),
  updatedAtStart: new DateSchema().schema.optional(),
  updatedAtEnd: new DateSchema().schema.optional(),
  page: new PageNumberSchema().schema.optional(),
  limit: new LimitSchema().schema.optional(),
});

export class SearchUserRoleRepositorySchema extends AbstractZodSchema {
  schema = baseSearchUserRoleRepositoryDtoSchema;
}
