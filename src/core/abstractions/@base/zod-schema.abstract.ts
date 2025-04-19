import { ZodFirstPartySchemaTypes } from 'zod';

export abstract class AbstractZodSchema {
  abstract schema: ZodFirstPartySchemaTypes;
}
