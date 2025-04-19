import { z } from 'zod';

export class ZodSchemaInternalValidationError extends z.ZodError<{
  [x: string]: any;
}> {
  constructor(
    error: z.ZodError<{
      [x: string]: any;
    }>,
  ) {
    super(error.issues);
  }
}
