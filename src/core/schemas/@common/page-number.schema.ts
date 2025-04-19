import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class PageNumberSchema extends AbstractPartialZodSchema {
  schema = z.number().min(1);
}
