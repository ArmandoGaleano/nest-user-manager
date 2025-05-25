import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { SystemDateTimeHelperService } from '@/shared/helpers/system-date-time/system-date-time.helper.service';
import { z } from 'zod';

export class DateSchema extends AbstractPartialZodSchema {
  schema = z.date().refine((value) => {
    const date = new SystemDateTimeHelperService().getDate(value);

    return !isNaN(date.getTime());
  }, 'Invalid date');
}
