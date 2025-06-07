// @ts-check
import { Client } from 'pg';

const cfg = {
  host: process.env.POSTGRES_HOST || 'postgres_db',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.APP_DB_USER || 'postgres',
  password: process.env.APP_DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
};

async function waitForPostgres() {
  const timeout = 60_000;
  const start = Date.now();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  while (true) {
    const client = new Client(cfg);

    try {
      await client.connect();
      await client.query('SELECT 1');
      console.log('🟢 Banco de dados PostgreSQL está pronto!');
      await client.end();
      break;
    } catch (err) {
      const elapsed = Date.now() - start;
      const msg = err?.message || err?.code || err;

      if (elapsed > timeout) {
        console.error(`🔴 Timeout (${elapsed}ms): ${msg}`);
        process.exit(1);
      }

      console.log(
        `🔵 Banco ainda não está pronto (${elapsed}ms)... aguardando 2s...`,
      );
      await delay(2000);
    } finally {
      await client.end().catch(() => {});
    }
  }
}

waitForPostgres();
