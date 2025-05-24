import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: process?.env?.POSTGRES_DB ?? 'postgres_db',
      user: process?.env?.POSTGRES_USER ?? 'root',
      password: process?.env?.POSTGRES_PASSWORD ?? 'postgrespassword',
      port: 5432,
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/production',
      extension: 'js',
    },
    seeds: {
      directory: './seeds',
      extension: 'js',
    },
  },
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
      min: 1,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/development',
      extension: 'js',
    },
    seeds: {
      directory: './seeds',
      extension: 'js',
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
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/staging',
      extension: 'js',
    },
    seeds: {
      directory: './seeds',
      extension: 'js',
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
      min: 1,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations/production',
      extension: 'js',
    },
    seeds: {
      directory: './seeds',
      extension: 'js',
    },
  },
};

export default config;
