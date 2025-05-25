import { Module } from '@nestjs/common';

import { CryptoHelperService } from '@/shared/helpers/crypto/crypto.helper.service';
import { SystemDateTimeHelperService } from '@/shared/helpers/system-date-time/system-date-time.helper.service';
@Module({
  providers: [
    {
      provide: SystemDateTimeHelperService,
      useValue: new SystemDateTimeHelperService(),
    },
    {
      provide: CryptoHelperService,
      useClass: CryptoHelperService,
    },
  ],
  exports: [SystemDateTimeHelperService, CryptoHelperService],
})
export class MainHelperServicesModule {}
