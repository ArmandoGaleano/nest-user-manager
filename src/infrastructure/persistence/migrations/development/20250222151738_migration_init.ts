import { Knex } from 'knex';
import { RolesModel } from '../../database-models/roles.model';

type RoleModelKeys = keyof RolesModel;
type UserModelKeys = keyof UsersModel;
type AuthTokenModelKeys = keyof AuthTokenModel | string;

export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
      // Criação da tabela de roles
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
      // Criação da tabela de users
      .createTable('users', (table) => {
        const _execute: Record<
          UserModelKeys,
          Knex.ColumnBuilder | Knex.ReferencingColumnBuilder
        > = {
          id: table.uuid('id').unique().notNullable().primary(),
          email: table.string('email').notNullable().unique(),
          password: table.string('password').notNullable(),
          firstName: table.string('firstName').notNullable(),
          lastName: table.string('lastName').notNullable(),
          birthdate: table.date('birthdate').notNullable(),
          document: table.string('document').notNullable().unique(),
          documentType: table.enum('documentType', ['CPF']).notNullable(),
          createdAt: table.timestamp('createdAt').defaultTo(knex.fn.now()),
          updatedAt: table.timestamp('updatedAt').defaultTo(knex.fn.now()),
        };
      })
      // Criação da tabela de associação (join table) user_roles
      .createTable('user_roles', (table) => {
        table
          .uuid('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE'); // Remove a associação se o usuário for deletado

        table
          .uuid('role_id')
          .notNullable()
          .references('id')
          .inTable('roles')
          .onDelete('CASCADE'); // Remove a associação se a role for deletada

        table.primary(['user_id', 'role_id']); // Garante que cada associação seja única

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
      })
      // Criação da tabela de auth_tokens
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
    .dropTableIfExists('users')
    .dropTableIfExists('roles');
}
