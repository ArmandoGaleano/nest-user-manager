import { ICryptoHelperService } from '@/core/interfaces/shared/helpers/crypto.helper.service.interface';

export abstract class AbstractCryptoHelperService
  implements ICryptoHelperService
{
  constructor() {}

  abstract generateUUID(): string;

  abstract hashPassword(password: string): Promise<string>;

  abstract verifyPassword(password: string, hash: string): Promise<boolean>;
}
