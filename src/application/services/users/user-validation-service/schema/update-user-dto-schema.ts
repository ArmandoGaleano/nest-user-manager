import { EnumUserModelDocument } from '@/infrastructure/persistence/database-models/user.enum';
import { z } from 'zod';

export const updateUserDtoZodSchema = z
  .object({
    id: z.string().uuid(),
    firstName: z.string().trim().min(1).optional(),
    lastName: z.string().trim().min(1).optional(),
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
      )
      .optional(),
    document: z.string().trim().optional(),
    documentType: z
      .nativeEnum(EnumUserModelDocument)
      .transform((val) => val as UserModelDocumentType)
      .optional(),
    roles: z.array(z.string().trim().min(1)).optional(),
  })
  .refine(
    (data) =>
      data.firstName ||
      data.lastName ||
      data.birthdate ||
      data.roles ||
      data.document ||
      data.documentType,
    {
      message:
        'Pelo menos um dos campos (firstName, lastName, birthdate, roles, document ou documentType) devem ser informados!',
    },
  );
