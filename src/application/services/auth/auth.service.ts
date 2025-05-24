import { Injectable } from '@nestjs/common';

import { IAuthService } from '@/core/interfaces/application/services/auth/auth-service.interface';
import { ICryptoHelperService } from '@/core/interfaces/shared/helpers/crypto.helper.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly CryptoHelperService: ICryptoHelperService) {}

  async hashPassword(password: string): Promise<string> {
    return await this.CryptoHelperService.hashPassword(password);
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    return await this.CryptoHelperService.verifyPassword(password, storedHash);
  }
}
