import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';
import { isValidCPF } from '../../utils/isValidCPF';

export class UserCPFSchema extends AbstractPartialZodSchema {
  schema = z
    .string()
    .trim()
    .refine((val) => {
      if (val?.length && isValidCPF(val)) {
        return true;
      }

      return false;
    });
}
