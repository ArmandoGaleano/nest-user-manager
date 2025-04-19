import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';
import { isValidCNPJ } from '../../utils/isValidCNPJ';

export class UserCNPJSchema extends AbstractPartialZodSchema {
  schema = z
    .string()
    .trim()
    .refine((val) => {
      if (val?.length && isValidCNPJ(val)) {
        return true;
      }

      return false;
    });
}
