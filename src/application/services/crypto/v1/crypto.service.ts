import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { ICryptoService } from './crypto-service.interface';

@Injectable()
export class CryptoService implements ICryptoService {
  constructor() {}

  generateUUID(): string {
    return randomUUID();
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await argon2.hash(password, {
        type: argon2.argon2id, // Melhor opção de Argon2
        memoryCost: 2 ** 16, // 64MB (proteção contra ataques de GPU)
        timeCost: 3, // Iterações (segurança vs performance)
        parallelism: 2, // Threads (ajustável conforme hardware)
      });
    } catch (error) {
      throw new Error('CryptoService error: hashPassword');
    }
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      return false;
    }
  }
}
