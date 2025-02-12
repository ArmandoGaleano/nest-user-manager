import { z } from 'zod';
import { UserRole } from 'src/core/database-entities/user-role.enum';

export const createUserZodSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(8),
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
  createdAt: z.date(),
  updatedAt: z.date(),
});
