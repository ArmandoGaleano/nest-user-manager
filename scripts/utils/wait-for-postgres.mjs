// @ts-check
import { Client } from 'pg';

const client = new Client({
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
});

async function waitForPostgres() {
  const timeout = 30000; // 30 segundos
  const start = Date.now();

  while (true) {
    try {
      await client.connect();
      await client.query('SELECT 1');
      console.log('🟢 Banco de dados PostgreSQL está pronto!');
      await client.end();
      break;
    } catch (err) {
      const elapsed = Date.now() - start;
      if (elapsed > timeout) {
        console.error('🔴 Timeout: PostgreSQL não respondeu a tempo.');
        process.exit(1);
      }
      console.log('🔵 Banco ainda não está pronto, aguardando 2s...');
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}

waitForPostgres();
