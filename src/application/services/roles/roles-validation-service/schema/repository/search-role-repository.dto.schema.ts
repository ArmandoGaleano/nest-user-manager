import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { DateSchema } from '@/core/schemas/@common/date.schema';

import { LimitSchema } from '@/core/schemas/@common/limit.schema';
import { PageNumberSchema } from '@/core/schemas/@common/page-number.schema';
import { RoleNameSchema } from '@/core/schemas/@common/roles/role-name.schema';

import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseSearchRoleDtoSchema = z.object({
  id: new UuidSchema().schema.optional(),
  name: new RoleNameSchema().schema.optional(),
  page: new PageNumberSchema().schema.optional(),
  limit: new LimitSchema().schema.optional(),
  createdAt: new DateSchema().schema.optional(),
  createdAtStart: new DateSchema().schema.optional(),
  createdAtEnd: new DateSchema().schema.optional(),
  updatedAt: new DateSchema().schema.optional(),
  updatedAtStart: new DateSchema().schema.optional(),
  updatedAtEnd: new DateSchema().schema.optional(),
  enableExactSearch: new DateSchema().schema.optional(),
});
export class SearchRoleRepositoryDtoSchema extends AbstractZodSchema {
  schema = baseSearchRoleDtoSchema;
}
