import { Injectable } from '@nestjs/common';

import { AbstractAuthService } from '@/core/abstractions/application/services/auth/auth.service.abstract';
import { AbstractCryptoHelperService } from '@/core/abstractions/shared/helpers/crypto-helper.service.abstract';

@Injectable()
export class AuthService extends AbstractAuthService {
  constructor(
    private readonly CryptoHelperService: AbstractCryptoHelperService,
  ) {
    super();
  }

  async hashPassword(password: string): Promise<string> {
    return await this.CryptoHelperService.hashPassword(password);
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    return await this.CryptoHelperService.verifyPassword(password, storedHash);
  }
}
