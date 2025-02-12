import type { Knex } from 'knex';
import type { UserModel } from 'src/core/database-entities/user-model.interface';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    const execute: Record<keyof UserModel, Knex.ColumnBuilder> = {
      id: table.uuid('id').unique().primary(),
      email: table.string('email').notNullable().unique(),
      password: table.string('password').notNullable(),
      firstName: table.string('firstName').notNullable(),
      lastName: table.string('lastName').notNullable(),
      birthdate: table.date('birthdate').notNullable(),
      role: table.string('role').notNullable(),
      createdAt: table.timestamp('createdAt').defaultTo(knex.fn.now()),
      updatedAt: table.timestamp('updatedAt').defaultTo(knex.fn.now()),
    };

    Object.values(execute).forEach((column) => column);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
