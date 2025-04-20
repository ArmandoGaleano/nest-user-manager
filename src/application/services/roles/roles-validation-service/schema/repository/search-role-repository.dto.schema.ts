import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';

import { CreatedAtSchema } from '@/core/schemas/@common/created-at.schema';
import { LimitSchema } from '@/core/schemas/@common/limit.schema';
import { PageNumberSchema } from '@/core/schemas/@common/page-number.schema';
import { RoleNameSchema } from '@/core/schemas/@common/roles/role-name.schema';
import { UpdatedAtSchema } from '@/core/schemas/@common/updated-at.schema';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseSearchRoleDtoSchema = z.object({
  id: new UuidSchema().schema.optional(),
  name: new RoleNameSchema().schema.optional(),
  page: new PageNumberSchema().schema.optional(),
  limit: new LimitSchema().schema.optional(),
  createdAt: new CreatedAtSchema().schema.optional(),
  createdAtStart: new CreatedAtSchema().schema.optional(),
  createdAtEnd: new CreatedAtSchema().schema.optional(),
  updatedAt: new UpdatedAtSchema().schema.optional(),
  updatedAtStart: new UpdatedAtSchema().schema.optional(),
  updatedAtEnd: new UpdatedAtSchema().schema.optional(),
  enableExactSearch: new UpdatedAtSchema().schema.optional(),
});
export class SearchRoleRepositoryDtoSchema extends AbstractZodSchema {
  schema = baseSearchRoleDtoSchema;
}
