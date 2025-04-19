import { z } from 'zod';
import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

const baseDeleteUserRepositorySchema = z.object({
  id: new UuidSchema().schema,
});

export class DeleteUserRepositoryDtoSchema extends AbstractZodSchema {
  schema = baseDeleteUserRepositorySchema;
}
