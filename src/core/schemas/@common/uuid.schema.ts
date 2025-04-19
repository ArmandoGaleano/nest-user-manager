import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class UuidSchema extends AbstractPartialZodSchema {
  schema = z.string().uuid();
}
