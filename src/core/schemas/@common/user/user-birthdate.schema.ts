import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { z } from 'zod';

export class UserBirthdateSchema extends AbstractPartialZodSchema {
  schema = z
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
    );
}
