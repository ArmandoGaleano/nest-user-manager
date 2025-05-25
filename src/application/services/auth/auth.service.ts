import { Injectable } from '@nestjs/common';

import { IAuthService } from '@/core/interfaces/application/services/auth/auth-service.interface';
import { CryptoHelperService } from '@/shared/helpers/crypto/crypto.helper.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly cryptoHelperService: CryptoHelperService) {}

  async hashPassword(password: string): Promise<string> {
    return await this.cryptoHelperService.hashPassword(password);
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    return await this.cryptoHelperService.verifyPassword(password, storedHash);
  }
}
