import KnexConfig from 'knex';

export const knex = KnexConfig({
  client: 'pg',
  version: '7.2',
  connection: {
    host: process?.env?.POSTGRES_HOST ?? 'postgres_db',
    port: 5432,
    user: process?.env?.POSTGRES_USER ?? 'root',
    password: process?.env?.POSTGRES_PASSWORD ?? 'postgrespassword',
    database: process?.env?.POSTGRES_DB ?? 'postgres_db',
    pool: {
      min: 0,
      max: 10,
    },
  },
});
