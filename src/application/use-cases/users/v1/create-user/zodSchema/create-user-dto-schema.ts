import { z } from 'zod';
import { UserRole } from 'src/core/database-entities/user-role.enum';

export const createUserDtoZodSchema = z.object({
  email: z.string().email(),
  password: z
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
    }),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  birthdate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Formato inválido. Use o padrão YYYY-MM-DD.',
    })
    .refine(
      (val) => {
        try {
          // Tenta converter a string para Date
          const date = new Date(val);
          // Verifica se a conversão resultou em uma data válida
          if (isNaN(date.getTime())) return false;

          // Normaliza as datas para ignorar a parte do horário (zero horas)
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          date.setHours(0, 0, 0, 0);

          // Verifica se a data é anterior ou igual a hoje
          if (date > today) return false;

          const minDate = new Date('1900-01-01');
          return date >= minDate;
        } catch {
          return false;
        }
      },
      {
        message: 'Data de nascimento inválida!',
      },
    ),
  role: z.nativeEnum(UserRole),
});
