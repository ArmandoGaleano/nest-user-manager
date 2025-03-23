import { z } from 'zod';

export const createRoleDtoZodSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(64),
  description: z.string().min(1).max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
});
