import { ZodFirstPartySchemaTypes } from 'zod';

export abstract class AbstractPartialZodSchema {
  abstract schema: ZodFirstPartySchemaTypes;
}
