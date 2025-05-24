import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class UserFirstNameSchema extends AbstractPartialZodSchema {
  schema = z.string().trim().min(1).max(100);
}
