import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class LimitSchema extends AbstractPartialZodSchema {
  schema = z.number().min(1).max(100).default(10);
}
