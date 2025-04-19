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
import { CreatedAtSchema } from '@/core/schemas/@common/created-at.schema';
import { UpdatedAtSchema } from '@/core/schemas/@common/updated-at.schema';
import { EnumUserModelDocument } from '@/infrastructure/persistence/database-models/user.enum';

const baseCreateUserRepositorySchema = z.object({
  id: new UuidSchema().schema,
  email: new UserEmailSchema().schema,
  password: new UserPasswordSchema().schema,
  firstName: new UserFirstNameSchema().schema,
  lastName: new UserLastNameSchema().schema,
  birthdate: new UserBirthdateSchema().schema,
  createdAt: new CreatedAtSchema().schema,
  updatedAt: new UpdatedAtSchema().schema,
});

const cpfUserSchema = baseCreateUserRepositorySchema.extend({
  documentType: z.literal(EnumUserModelDocument.CPF),
  document: new UserCPFSchema().schema,
});

const cnpjUserSchema = baseCreateUserRepositorySchema.extend({
  documentType: z.literal(EnumUserModelDocument.CNPJ),
  document: new UserCNPJSchema().schema,
});

export class CreateUserRepositoryDtoSchema extends AbstractZodSchema {
  schema = z.discriminatedUnion('documentType', [
    cpfUserSchema,
    cnpjUserSchema,
  ]);
}
