import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class RoleDescriptionSchema extends AbstractPartialZodSchema {
  schema = z.string().min(1).max(255);
}
