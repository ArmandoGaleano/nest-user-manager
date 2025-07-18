import { z } from 'zod';
import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';
import { UserEmailSchema } from '@/core/schemas/@common/user/user-email.schema';
import { UserPasswordSchema } from '@/core/schemas/@common/user/user-password.schema';
import { UserFirstNameSchema } from '@/core/schemas/@common/user/user-first-name.schema';
import { UserLastNameSchema } from '@/core/schemas/@common/user/user-last-name';
import { UserBirthdateSchema } from '@/core/schemas/@common/user/user-birthdate.schema';
import { UserCPFSchema } from '@/core/schemas/@common/user/user-cpf.schema';
import { UserCNPJSchema } from '@/core/schemas/@common/user/user-cnpj.schema';
import { EnumUserModelDocument } from '@/infrastructure/persistence/database-models/user.enum';
import { DateSchema } from '@/core/schemas/@common/date.schema';

const baseUpdateUserRepositorySchema = z.object({
  id: new UuidSchema().schema,
  email: new UserEmailSchema().schema.optional(),
  password: new UserPasswordSchema().schema.optional(),
  firstName: new UserFirstNameSchema().schema.optional(),
  lastName: new UserLastNameSchema().schema.optional(),
  birthdate: new UserBirthdateSchema().schema.optional(),
  updatedAt: new DateSchema().schema,
});

const cpfUserSchema = baseUpdateUserRepositorySchema.extend({
  documentType: z.literal(EnumUserModelDocument.CPF),
  document: new UserCPFSchema().schema,
});

const cnpjUserSchema = baseUpdateUserRepositorySchema.extend({
  documentType: z.literal(EnumUserModelDocument.CNPJ),
  document: new UserCNPJSchema().schema,
});

const documentTypeUndefinedSchema = baseUpdateUserRepositorySchema.extend({
  documentType: z.undefined(),
});

export class UpdateUserRepositoryDtoSchema extends AbstractZodSchema {
  schema = z.discriminatedUnion('documentType', [
    cpfUserSchema,
    cnpjUserSchema,
    documentTypeUndefinedSchema,
  ]);
}
