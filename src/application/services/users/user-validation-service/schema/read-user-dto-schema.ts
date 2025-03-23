import { z } from 'zod';

export const readUserDtoZodSchema = z
  .object({
    id: z.string().uuid().optional(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.id || data.email, {
    message: 'Pelo menos um dos campos (id ou email) deve ser informado.',
  });
