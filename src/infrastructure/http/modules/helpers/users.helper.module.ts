import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/helpers/system-date-time-helper.abstract';
import { SystemDateTimeHelperService } from '@/helpers/system-date-time/system-date-time.helper.service';

import { AbstractCryptoHelperService } from '@/core/abstractions/helpers/crypto-helper.service.abstract';
import { CryptoHelperService } from '@/helpers/crypto/crypto.helper.service';

import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: AbstractSystemDateTimeHelperService,
      useValue: new SystemDateTimeHelperService(),
    },
    {
      provide: AbstractCryptoHelperService,
      useValue: new CryptoHelperService(),
    },
  ],
  exports: [AbstractSystemDateTimeHelperService, AbstractCryptoHelperService],
})
export class UserHelperModule {}
