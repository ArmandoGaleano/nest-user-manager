import { Injectable } from '@nestjs/common';
import { knex } from 'src/infrastructure/persistence/knex';
import { z } from 'zod';
import { createUserZodSchema } from './zodSchema/create-user-zod-schema';
import type { IUser } from 'src/core/domain/user/user.interface';
import type { IAuthService } from './auth-service.interface';
import { CryptoService } from 'src/application/services/crypto/v1/crypto.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly cryptoService: CryptoService) {}

  async hashPassword(password: string): Promise<string> {
    return await this.cryptoService.hashPassword(password);
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    return await this.cryptoService.verifyPassword(password, storedHash);
  }

  async validateNewUser(user: IUser): Promise<
    | {
        isValid: true;
        validatedData: IUser;
      }
    | {
        isValid: false;
        message: any[];
        internalError: boolean;
      }
  > {
    try {
      const { data, error } = createUserZodSchema.safeParse(user);

      if (error) {
        throw error;
      }
      // Verificar se id e e-mail estão cadastrados
      const searchByExistentAccount = await knex('users')
        .where({ id: user.id })
        .orWhere({ email: user.email });

      console.log({ searchByExistentAccount });

      if (searchByExistentAccount.length > 0) {
        return {
          isValid: false,
          message: ['Usuário já existe!'],
          internalError: false,
        };
      }

      return {
        isValid: true,
        validatedData: data,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('CreateUserUseCase error: validateNewUser');
        console.error(error);

        return {
          isValid: false,
          message: ['Internal server error'],
          internalError: true,
        };
      }

      return {
        isValid: false,
        message: ['Internal server error'],
        internalError: true,
      };
    }
  }
}
