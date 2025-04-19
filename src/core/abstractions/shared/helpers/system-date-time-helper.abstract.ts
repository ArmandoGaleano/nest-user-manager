import { ISystemDateTimeServiceHelper } from '@/core/interfaces/shared/helpers/system-date-time.helper.service.interface';

export abstract class AbstractSystemDateTimeHelperService
  implements ISystemDateTimeServiceHelper
{
  abstract getDate(): Date;

  abstract getTimestamp(): number;

  abstract hasTimestampExpired(timestamp: number);
}
