import { Knex } from 'knex';
import { RolesModel } from '../../../database-models/roles.model';
import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';

type RoleModelKeys = keyof RolesModel;
type UserModelKeys = keyof UsersModel;
type AuthTokenModelKeys = keyof AuthTokenModel | string;

export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
      // Create the users table
      .createTable('users', (table) => {
        const _execute: Record<UserModelKeys, Knex.ColumnBuilder> = {
          id: table.uuid('id').unique().notNullable().primary(),
          email: table.string('email').notNullable().unique(),
          password: table.string('password').notNullable(),
          firstName: table.string('firstName').notNullable(),
          lastName: table.string('lastName').notNullable(),
          birthdate: table.date('birthdate').notNullable(),
          document: table.string('document').notNullable().unique(),
          documentType: table
            .enum('documentType', ['CPF', 'CNPJ'])
            .notNullable(),
          createdAt: table.timestamp('createdAt').defaultTo(knex.fn.now()),
          updatedAt: table.timestamp('updatedAt').defaultTo(knex.fn.now()),
        };
      })
      // Create the roles table
      .createTable('roles', (table) => {
        const _execute: Record<RoleModelKeys, Knex.ColumnBuilder> = {
          id: table.uuid('id').unique().notNullable().primary(),
          name: table.string('name').notNullable().unique(),
          description: table.string('description').notNullable(),
          createdAt: table
            .timestamp('createdAt')
            .defaultTo(knex.fn.now())
            .notNullable(),
          updatedAt: table
            .timestamp('updatedAt')
            .defaultTo(knex.fn.now())
            .notNullable(),
        };
      })
      // Create the permissions table
      .createTable('permissions', (table) => {
        table.uuid('id').unique().notNullable().primary();
        table.string('name').notNullable().unique();
        table.string('description').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
      })
      // Create the role_permissions table
      .createTable('role_permissions', (table) => {
        // roleId
        table
          .uuid('roleId')
          .notNullable()
          .references('id')
          .inTable('roles')
          .onDelete('CASCADE');
        // permissionId
        table
          .uuid('permissionId')
          .notNullable()
          .references('id')
          .inTable('permissions')
          .onDelete('CASCADE');

        table.primary(['roleId', 'permissionId']);
        // createdAt
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        // updatedAt
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
      })

      // Create the user_roles table
      .createTable('user_roles', (table) => {
        table
          .uuid('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table
          .uuid('role_id')
          .notNullable()
          .references('id')
          .inTable('roles')
          .onDelete('CASCADE');

        table.primary(['user_id', 'role_id']);

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
      })

      // Create the auth_tokens table
      .createTable('auth_tokens', (table) => {
        const _execute: Record<
          AuthTokenModelKeys,
          Knex.ColumnBuilder | Knex.ReferencingColumnBuilder
        > = {
          id: table.uuid('id').unique().notNullable().primary(),
          userId: table
            .uuid('userId')
            .notNullable()
            .references('id')
            .inTable('users'),
          token: table.string('token').notNullable().unique(),
          revoked: table.boolean('revoked').notNullable(),
          expiresAt: table.timestamp('expiresAt').notNullable(),
          createdAt: table.timestamp('createdAt').defaultTo(knex.fn.now()),
          updatedAt: table.timestamp('updatedAt').defaultTo(knex.fn.now()),
        };
      })
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('auth_tokens')
    .dropTableIfExists('user_roles')
    .dropTableIfExists('role_permissions')
    .dropTableIfExists('permissions')
    .dropTableIfExists('roles')
    .dropTableIfExists('users');
}
