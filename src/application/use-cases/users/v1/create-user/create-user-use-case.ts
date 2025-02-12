import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { HttpResponse } from 'src/infrastructure/http/HttpResponse';
import { HttpError } from 'src/infrastructure/http/HttpError';
import { User } from 'src/core/domain/user/user';
import { knex } from 'src/infrastructure/persistence/knex';
import { createUserDtoZodSchema } from './zodSchema/create-user-dto-schema';
import { createUserZodSchema } from './zodSchema/create-user-zod-schema';
import type {
  CreateServiceHttpErrorType,
  CreateServiceHttpSuccessType,
  ICreateUserUseCase,
} from './create-user-use-case.interface';
import type { ICreateUserDto } from 'src/application/dtos/users/create-user-dto.interface';
import type { IUser } from 'src/core/domain/user/user.interface';
import { AuthService } from 'src/application/services/auth/v1/auth.service';
import { CryptoService } from 'src/application/services/crypto/v1/crypto.service';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
  ) {}

  public async execute(
    dto: ICreateUserDto,
  ): Promise<
    HttpResponse<CreateServiceHttpSuccessType, CreateServiceHttpErrorType>
  > {
    const validateDto = this.validateDto(dto);

    if (!validateDto.isValid) {
      return new HttpResponse<
        CreateServiceHttpSuccessType,
        CreateServiceHttpErrorType
      >({
        HttpError: new HttpError({
          statusCode: 400,
          contentType: 'application/json',
          data: validateDto.message,
        }),
      });
    }

    const validateNewUser = await this.validateNewUser({
      id: this.cryptoService.generateUUID(),
      ...validateDto.validatedData,
      password: await this.authService.hashPassword(dto.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!validateNewUser.isValid) {
      return new HttpResponse<
        CreateServiceHttpSuccessType,
        CreateServiceHttpErrorType
      >({
        HttpError: new HttpError({
          statusCode: validateNewUser.internalError ? 500 : 400,
          contentType: 'application/json',
          data: validateNewUser.message,
        }),
      });
    }

    const response = await knex('users').insert({
      ...validateNewUser.validatedData,
    });

    console.log({ response });

    return new HttpResponse<
      CreateServiceHttpSuccessType,
      CreateServiceHttpErrorType
    >({
      HttpSuccess: {
        statusCode: 201,
        contentType: 'application/json',
        data: new User({
          ...validateNewUser.validatedData,
        }),
      },
    });
  }

  private validateDto(dto: ICreateUserDto):
    | {
        isValid: true;
        validatedData: ICreateUserDto;
      }
    | {
        isValid: false;
        message: any[];
      } {
    try {
      const { data, error } = createUserDtoZodSchema.safeParse(dto);

      if (error) {
        throw error;
      }

      return {
        isValid: true,
        validatedData: data,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('CreateUserUseCase error: validateDto');
        console.error(error);

        return {
          isValid: false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          message: JSON.parse(error.message.toString()),
        };
      }

      return {
        isValid: false,
        message: ['Internal server error'],
      };
    }
  }
  private async validateNewUser(user: IUser): Promise<
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
