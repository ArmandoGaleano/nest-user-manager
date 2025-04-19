import { Module } from '@nestjs/common';

import { AbstractCryptoHelperService } from '@/core/abstractions/shared/helpers/crypto-helper.service.abstract';
import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/shared/helpers/system-date-time-helper.abstract';

import { CryptoHelperService } from '@/shared/helpers/crypto/crypto.helper.service';
import { SystemDateTimeHelperService } from '@/shared/helpers/system-date-time/system-date-time.helper.service';
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
export class MainHelperServicesModule {}
