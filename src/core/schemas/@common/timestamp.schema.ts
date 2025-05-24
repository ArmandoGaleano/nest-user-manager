import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class TimestampSchema extends AbstractPartialZodSchema {
  schema = z.number().refine((value) => {
    const date = new Date(value);

    return !isNaN(date.getTime());
  }, 'Invalid timestamp');
}
