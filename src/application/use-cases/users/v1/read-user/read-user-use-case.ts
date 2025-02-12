import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { HttpResponse } from 'src/infrastructure/http/HttpResponse';
import { HttpError } from 'src/infrastructure/http/HttpError';
import { User } from 'src/core/domain/user/user';
import { knex } from 'src/infrastructure/persistence/knex';
import { readUserDtoZodSchema } from './zodSchema/read-user-dto-schema';
import type {
  ReadServiceHttpSuccessType,
  ReadServiceHttpErrorType,
  IReadUserUseCase,
} from './read-user-use-case.interface';
import { AuthService } from 'src/application/services/auth/v1/auth.service';
import { CryptoService } from 'src/application/services/crypto/v1/crypto.service';
import { IReadUserDto } from 'src/application/dtos/users/read-user-dto.interface';
import { IUser } from 'src/core/domain/user/user.interface';

@Injectable()
export class ReadUserUseCase implements IReadUserUseCase {
  constructor(
    // private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
  ) {}

  public async execute(
    dto: IReadUserDto,
  ): Promise<
    HttpResponse<ReadServiceHttpSuccessType, ReadServiceHttpErrorType>
  > {
    const validateDto = this.validateDto(dto);

    if (!validateDto.isValid) {
      return new HttpResponse<
        ReadServiceHttpSuccessType,
        ReadServiceHttpErrorType
      >({
        HttpError: new HttpError({
          statusCode: 400,
          contentType: 'application/json',
          data: validateDto.message,
        }),
      });
    }

    const response = (await knex('users').where({ ...dto })) as IUser[];

    if (!response?.length) {
      return new HttpResponse<
        ReadServiceHttpSuccessType,
        ReadServiceHttpErrorType
      >({
        HttpError: new HttpError({
          statusCode: 404,
          contentType: 'application/json',
          data: 'User not found',
        }),
      });
    }

    console.log('ReadUserUseCase response');
    console.log({ response });

    return new HttpResponse<
      ReadServiceHttpSuccessType,
      ReadServiceHttpErrorType
    >({
      HttpSuccess: {
        statusCode: 201,
        contentType: 'application/json',
        data: new User({
          ...response[0],
        }),
      },
    });
  }

  private validateDto(dto: IReadUserDto):
    | {
        isValid: true;
        validatedData: IReadUserDto;
      }
    | {
        isValid: false;
        message: any[];
      } {
    try {
      const { data, error } = readUserDtoZodSchema.safeParse(dto);

      if (error) {
        throw error;
      }

      return {
        isValid: true,
        validatedData: data,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('ReadUserUseCase error: validateDto');
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
}
