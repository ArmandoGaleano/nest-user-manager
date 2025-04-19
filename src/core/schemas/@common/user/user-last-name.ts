import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class UserLastNameSchema extends AbstractPartialZodSchema {
  schema = z.string().trim().min(1);
}
