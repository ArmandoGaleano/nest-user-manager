import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class CreatedAtSchema extends AbstractPartialZodSchema {
  schema = z.date();
}
