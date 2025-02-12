import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: process?.env?.POSTGRES_HOST ?? 'postgres_db',
      database: process?.env?.POSTGRES_DB ?? 'postgres_db',
      user: process?.env?.POSTGRES_USER ?? 'root',
      password: process?.env?.POSTGRES_PASSWORD ?? 'postgrespassword',
      port: 5432,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/development',
      extension: 'ts',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: process?.env?.POSTGRES_HOST ?? 'postgres_db',
      database: process?.env?.POSTGRES_DB ?? 'postgres_db',
      user: process?.env?.POSTGRES_USER ?? 'root',
      password: process?.env?.POSTGRES_PASSWORD ?? 'postgrespassword',
      port: 5432,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/staging',
      extension: 'ts',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process?.env?.POSTGRES_HOST ?? 'postgres_db',
      database: process?.env?.POSTGRES_DB ?? 'postgres_db',
      user: process?.env?.POSTGRES_USER ?? 'root',
      password: process?.env?.POSTGRES_PASSWORD ?? 'postgrespassword',
      port: 5432,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/production',
      extension: 'ts',
    },
  },
};

module.exports = config;
