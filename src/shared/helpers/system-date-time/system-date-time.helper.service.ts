import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/shared/helpers/system-date-time-helper.abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemDateTimeHelperService extends AbstractSystemDateTimeHelperService {
  private timezone: Intl.DateTimeFormatOptions['timeZone'] =
    'America/Sao_Paulo';

  constructor(
    private props?: { timezone?: Intl.DateTimeFormatOptions['timeZone'] },
  ) {
    super();

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
