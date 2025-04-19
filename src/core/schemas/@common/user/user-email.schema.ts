import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class UserEmailSchema extends AbstractPartialZodSchema {
  schema = z.string().email();
}
