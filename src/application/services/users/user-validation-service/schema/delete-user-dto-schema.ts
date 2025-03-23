import { z } from 'zod';

export const deleteUserZodSchema = z.object({
  id: z.string().uuid(),
});
