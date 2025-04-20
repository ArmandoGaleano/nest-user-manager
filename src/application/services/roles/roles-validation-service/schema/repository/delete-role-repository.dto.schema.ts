import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';

import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

import { z } from 'zod';

const baseDeleteRoleDtoSchema = z.object({
  id: new UuidSchema().schema,
});

export class DeleteRoleRepositoryDtoSchema extends AbstractZodSchema {
  schema = baseDeleteRoleDtoSchema;
}
