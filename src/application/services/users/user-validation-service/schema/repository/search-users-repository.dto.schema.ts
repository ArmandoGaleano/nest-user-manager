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
import { EnumDefaultUserRoles } from '@/infrastructure/persistence/database-models/roles.model';
import { ListRoleTextSchema } from '@/core/schemas/@common/roles/list-role-text.schema';
import { PageNumberSchema } from '@/core/schemas/@common/page-number.schema';

// abstract id?: ISearchUsersRepositoryDto['id'];
// abstract email?: ISearchUsersRepositoryDto['email'];
// abstract firstName?: ISearchUsersRepositoryDto['firstName'];
// abstract lastName?: ISearchUsersRepositoryDto['lastName'];
// abstract birthdate?: ISearchUsersRepositoryDto['birthdate'];
// abstract document?: ISearchUsersRepositoryDto['document'];
// abstract documentType?: ISearchUsersRepositoryDto['documentType'];
// abstract createdAt?: ISearchUsersRepositoryDto['createdAt'];
// abstract createdAtStart?: ISearchUsersRepositoryDto['createdAtStart'];
// abstract createdAtEnd?: ISearchUsersRepositoryDto['createdAtEnd'];
// abstract updatedAt?: ISearchUsersRepositoryDto['updatedAt'];
// abstract updatedAtStart?: ISearchUsersRepositoryDto['updatedAtStart'];
// abstract updatedAtEnd?: ISearchUsersRepositoryDto['updatedAtEnd'];
// abstract roles?: ISearchUsersRepositoryDto['roles'];
// abstract page?: ISearchUsersRepositoryDto['page'];
// abstract limit?: ISearchUsersRepositoryDto['limit'];

const baseSearchUserRepositorySchema = z.object({
  id: new UuidSchema().schema.optional(),
  email: new UserEmailSchema().schema.optional(),
  firstName: new UserFirstNameSchema().schema.optional(),
  lastName: new UserLastNameSchema().schema.optional(),
  birthdate: new UserBirthdateSchema().schema.optional(),
  createdAt: new CreatedAtSchema().schema.optional(),
  createdAtStart: new CreatedAtSchema().schema.optional(),
  createdAtEnd: new CreatedAtSchema().schema.optional(),
  updatedAt: new UpdatedAtSchema().schema.optional(),
  updatedAtStart: new UpdatedAtSchema().schema.optional(),
  updatedAtEnd: new UpdatedAtSchema().schema.optional(),
  roles: new ListRoleTextSchema().schema.optional(),
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
