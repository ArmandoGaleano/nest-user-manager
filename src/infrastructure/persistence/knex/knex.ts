import Knex from 'knex';
import knexConfig from './knexfile';

const env = (process.env.NODE_ENV || 'development').trim();
if (!['development', 'test', 'staging', 'production'].includes(env)) {
  throw new Error(`Invalid NODE_ENV "${env}" for Knex`);
}

export const knex = Knex(knexConfig[env]);
