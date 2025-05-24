import { z } from 'zod';
import { AbstractZodSchema } from '@/core/abstractions/@base/zod-schema.abstract';
import { UuidSchema } from '@/core/schemas/@common/uuid.schema';
import { UserEmailSchema } from '@/core/schemas/@common/user/user-email.schema';
import { UserFirstNameSchema } from '@/core/schemas/@common/user/user-first-name.schema';
import { UserLastNameSchema } from '@/core/schemas/@common/user/user-last-name';
import { UserBirthdateSchema } from '@/core/schemas/@common/user/user-birthdate.schema';
import { UserCPFSchema } from '@/core/schemas/@common/user/user-cpf.schema';
import { UserCNPJSchema } from '@/core/schemas/@common/user/user-cnpj.schema';
import { TimestampSchema } from '@/core/schemas/@common/timestamp.schema';

import { EnumUserModelDocument } from '@/infrastructure/persistence/database-models/user.enum';
import { RoleNameListSchema } from '@/core/schemas/@common/roles/role-name-list.schema';
import { PageNumberSchema } from '@/core/schemas/@common/page-number.schema';

const baseSearchUserRepositorySchema = z.object({
  id: new UuidSchema().schema.optional(),
  email: new UserEmailSchema().schema.optional(),
  firstName: new UserFirstNameSchema().schema.optional(),
  lastName: new UserLastNameSchema().schema.optional(),
  birthdate: new UserBirthdateSchema().schema.optional(),
  createdAt: new TimestampSchema().schema.optional(),
  createdAtStart: new TimestampSchema().schema.optional(),
  createdAtEnd: new TimestampSchema().schema.optional(),
  updatedAt: new TimestampSchema().schema.optional(),
  updatedAtStart: new TimestampSchema().schema.optional(),
  updatedAtEnd: new TimestampSchema().schema.optional(),
  roleNames: new RoleNameListSchema().schema.optional(),
  page: new PageNumberSchema().schema.optional(),
});

const cpfUserSchema = baseSearchUserRepositorySchema.extend({
  documentType: z.literal(EnumUserModelDocument.CPF),
  document: new UserCPFSchema().schema,
});

const cnpjUserSchema = baseSearchUserRepositorySchema.extend({
  documentType: z.literal(EnumUserModelDocument.CNPJ),
  document: new UserCNPJSchema().schema,
});

const documentTypeUndefinedSchema = baseSearchUserRepositorySchema.extend({
  documentType: z.undefined(),
});

export class SearchUserRepositoryDtoSchema extends AbstractZodSchema {
  schema = z.discriminatedUnion('documentType', [
    cpfUserSchema,
    cnpjUserSchema,
    documentTypeUndefinedSchema,
  ]);
}
