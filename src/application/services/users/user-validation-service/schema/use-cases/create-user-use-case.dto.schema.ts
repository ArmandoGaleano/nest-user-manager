import { z } from 'zod';
import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { UserEmailSchema } from '@/core/schemas/@common/user/user-email.schema';
import { UserPasswordSchema } from '@/core/schemas/@common/user/user-password.schema';
import { UserFirstNameSchema } from '@/core/schemas/@common/user/user-first-name.schema';
import { UserLastNameSchema } from '@/core/schemas/@common/user/user-last-name';
import { UserBirthdateSchema } from '@/core/schemas/@common/user/user-birthdate.schema';
import { RoleNameListSchema } from '@/core/schemas/@common/roles/role-name-list.schema';
import { UserCPFSchema } from '@/core/schemas/@common/user/user-cpf.schema';
import { UserCNPJSchema } from '@/core/schemas/@common/user/user-cnpj.schema';
import { EnumUserModelDocument } from '@/infrastructure/persistence/database-models/user.enum';

const baseUserSchema = z.object({
  email: new UserEmailSchema().schema,
  password: new UserPasswordSchema().schema,
  firstName: new UserFirstNameSchema().schema,
  lastName: new UserLastNameSchema().schema,
  birthdate: new UserBirthdateSchema().schema,
  roleNames: new RoleNameListSchema().schema,
});

const cpfUserSchema = baseUserSchema.extend({
  documentType: z.literal(EnumUserModelDocument.CPF),
  document: new UserCPFSchema().schema,
});

const cnpjUserSchema = baseUserSchema.extend({
  documentType: z.literal(EnumUserModelDocument.CNPJ),
  document: new UserCNPJSchema().schema,
});

export class CreateUserUseCaseDtoSchema extends AbstractZodSchema {
  schema = z.discriminatedUnion('documentType', [
    cpfUserSchema,
    cnpjUserSchema,
  ]);
}
