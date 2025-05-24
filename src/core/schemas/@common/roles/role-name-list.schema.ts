import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';
import { RoleNameSchema } from './role-name.schema';

export class RoleNameListSchema extends AbstractPartialZodSchema {
  schema = z.array(new RoleNameSchema().schema).min(1).default([]);
}
