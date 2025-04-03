import { EnumUserModelDocument } from '@/infrastructure/persistence/database-models/user.enum';
import { z } from 'zod';

export const searchUsersDtoZodSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email().optional(),
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
  roles: z.array(z.string().min(1)).min(1).default([]).optional(),
  createdAt: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return val;
    },
    z
      .date({
        invalid_type_error:
          'A data fornecida não está em um formato ISO válido.',
      })
      .optional(),
  ),
  createdAtStart: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return val;
    },
    z
      .date({
        invalid_type_error:
          'A data fornecida não está em um formato ISO válido.',
      })
      .optional(),
  ),
  createdAtEnd: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return val;
    },
    z
      .date({
        invalid_type_error:
          'A data fornecida não está em um formato ISO válido.',
      })
      .optional(),
  ),
  updatedAt: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return val;
    },
    z
      .date({
        invalid_type_error:
          'A data fornecida não está em um formato ISO válido.',
      })
      .optional(),
  ),
  updatedAtStart: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return val;
    },
    z
      .date({
        invalid_type_error:
          'A data fornecida não está em um formato ISO válido.',
      })
      .optional(),
  ),
  updatedAtEnd: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return val;
    },
    z
      .date({
        invalid_type_error:
          'A data fornecida não está em um formato ISO válido.',
      })
      .optional(),
  ),
  page: z
    .preprocess((val) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string' && !isNaN(Number(val))) {
        return parseInt(val, 10);
      }
      return val;
    }, z.number().int().positive().default(1))
    .optional(),

  limit: z
    .preprocess((val) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string' && !isNaN(Number(val))) {
        return parseInt(val, 10);
      }
      return val;
    }, z.number().int().positive().default(10))
    .optional(),
});
