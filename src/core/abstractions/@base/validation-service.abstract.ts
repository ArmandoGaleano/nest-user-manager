import { Either, left, right } from '@/shared/either';
import { AbstractZodSchema } from './zod-schema.abstract';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';

export abstract class AbstractValidationService {
  protected validateDtoSchema<TInterfaceResultType>({
    currentMethodName,
    zodSchema,
    dto,
  }: {
    currentMethodName: string;
    zodSchema: AbstractZodSchema;
    dto: TInterfaceResultType;
  }): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    TInterfaceResultType
  > {
    try {
      const parsedSchemaResult = zodSchema.schema.safeParse(dto);

      if (parsedSchemaResult.error) {
        return left(parsedSchemaResult.error);
      }

      return right(parsedSchemaResult.data);
    } catch (error) {
      console.error(`${currentMethodName} error when executing validateDto`);
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
