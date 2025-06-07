import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: process?.env?.POSTGRES_DB ?? 'POSTGRES_DB not set',
      user: process?.env?.APP_DB_USER ?? 'POSTGRES_DB not set',
      password: process?.env?.APP_DB_PASSWORD ?? 'POSTGRES_DB not set',
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
      host: process?.env?.POSTGRES_HOST ?? 'POSTGRES_HOST not set',
      database: process?.env?.POSTGRES_DB ?? 'POSTGRES_DB not set',
      user: process?.env?.APP_DB_USER ?? 'APP_DB_USER not set',
      password: process?.env?.APP_DB_PASSWORD ?? 'APP_DB_PASSWORD not set',
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
      host: process?.env?.POSTGRES_HOST ?? 'POSTGRES_HOST not set',
      database: process?.env?.POSTGRES_DB ?? 'POSTGRES_DB not set',
      user: process?.env?.APP_DB_USER ?? 'APP_DB_USER not set',
      password: process?.env?.APP_DB_PASSWORD ?? 'APP_DB_PASSWORD not set',
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
      host: process?.env?.POSTGRES_HOST ?? 'POSTGRES_HOST not set',
      database: process?.env?.POSTGRES_DB ?? 'POSTGRES_DB not set',
      user: process?.env?.APP_DB_USER ?? 'APP_DB_USER not set',
      password: process?.env?.APP_DB_PASSWORD ?? 'APP_DB_PASSWORD not set',
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
