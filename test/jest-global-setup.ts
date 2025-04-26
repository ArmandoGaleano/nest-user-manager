import { knex } from '../src/infrastructure/persistence/knex/knex';
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env',
});

export default async function globalSetup() {
  await knex.migrate.latest();
}
