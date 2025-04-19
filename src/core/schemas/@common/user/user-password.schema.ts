import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class UserPasswordSchema extends AbstractPartialZodSchema {
  schema = z
    .string()
    .min(12, 'A senha deve ter no mínimo 12 caracteres.')
    .max(64, 'A senha não pode ter mais de 64 caracteres.')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula (A-Z).')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula (a-z).')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número (0-9).')
    .regex(
      /[^a-zA-Z0-9]/,
      'A senha deve conter pelo menos um caractere especial (!@#$%^&*...).',
    )
    .refine((value) => !/\s/.test(value), {
      message: 'A senha não pode conter espaços em branco.',
    });
}
