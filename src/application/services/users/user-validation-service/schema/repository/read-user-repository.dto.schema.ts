import { z } from 'zod';
import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';
import { UserEmailSchema } from '@/core/schemas/@common/user/user-email.schema';

const baseReadUserRepositoySchema = z
  .object({
    id: new UuidSchema().schema.optional(),
    email: new UserEmailSchema().schema.optional(),
  })
  .refine((data) => data.id !== undefined || data.email !== undefined, {
    message: 'You need to provide your ID or email.',
  });

export class ReadUserRepositoryDtoSchema extends AbstractZodSchema {
  schema = baseReadUserRepositoySchema;
}
