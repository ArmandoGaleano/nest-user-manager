import { AbstractPartialZodSchema } from '@/core/abstractions/@base/partial-zod-schema.abstract';
import { EnumUserModelDocument } from '@/infrastructure/persistence/database-models/user.enum';
import { z } from 'zod';

export class UserDocumentTypeSchema extends AbstractPartialZodSchema {
  schema = z
    .nativeEnum(EnumUserModelDocument)
    .transform((val) => val as UserModelDocumentType);
}
