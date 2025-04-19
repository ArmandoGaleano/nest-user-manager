import { Injectable } from '@nestjs/common';
import { IAuthService } from '@/core/interfaces/application/services/auth/auth-service.interface';

@Injectable()
export abstract class AbstractAuthService implements IAuthService {
  abstract hashPassword(password: string): Promise<string>;

  abstract verifyPassword(
    password: string,
    storedHash: string,
  ): Promise<boolean>;
}
