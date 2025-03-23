import { Injectable } from '@nestjs/common';
import { AbstractCryptoHelperService } from '@/core/abstractions/helpers/crypto-helper.service.abstract';
import { AbstractAuthService } from '@/core/abstractions/services/auth/auth.service.abstract';

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
