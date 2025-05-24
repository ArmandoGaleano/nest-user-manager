import { ISystemDateTimeServiceHelper } from '@/core/interfaces/shared/helpers/system-date-time.helper.service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemDateTimeHelperService
  implements ISystemDateTimeServiceHelper
{
  private timezone: Intl.DateTimeFormatOptions['timeZone'] =
    'America/Sao_Paulo';

  constructor(
    private props?: { timezone?: Intl.DateTimeFormatOptions['timeZone'] },
  ) {
    const { timezone } = this.props ?? { timezone: this.timezone };

    this.timezone = timezone;
  }

  public getDate(date?: Date): Date {
    return new Date(
      (date ?? new Date()).toLocaleString('en-US', { timeZone: this.timezone }),
    );
  }

  public getTimestamp(): number {
    return this.getDate().getTime();
  }

  public hasTimestampExpired(timestamp: number): boolean {
    return this.getTimestamp() > timestamp;
  }
}
