import fs from 'fs';
import path from 'path';
import selfsigned from 'selfsigned';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// --- CLI setup ---
const argv = yargs(hideBin(process.argv))
  .option('out', {
    alias: 'o',
    type: 'string',
    describe: 'Output directory for cert and key',
    default: './docker/certs',
  })
  .option('host', {
    alias: 'h',
    type: 'string',
    describe: 'Common Name and DNS SAN entry',
    default: 'localhost',
  })
  .option('ip', {
    alias: 'i',
    type: 'string',
    describe: 'IP SAN entry',
    default: '127.0.0.1',
  })
  .argv;

// Resolve output directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '..', '..', argv.out);
const certPath = path.join(outDir, 'dev-cert.pem');
const keyPath = path.join(outDir, 'dev-key.pem');

// Ensure directory
mkdirSync(outDir, { recursive: true });

console.log(`🔐 Generating self-signed certificate for development:`);
console.log(`   - Hostname: ${argv.host}`);
console.log(`   - IP: ${argv.ip}`);
console.log(`   - Output: ${outDir}`);

// Self-signed certificate attributes
const attrs = [{ name: 'commonName', value: argv.host }];
const extensions = [
  {
    name: 'subjectAltName',
    altNames: [
      { type: 2, value: argv.host }, // DNS
      { type: 7, ip: argv.ip },       // IP
    ],
  },
];

const opts = {
  days: 365,
  keySize: 2048,
  extensions,
};

const pems = selfsigned.generate(attrs, opts);

// Write files
fs.writeFileSync(certPath, pems.cert, { mode: 0o644 });
fs.writeFileSync(keyPath, pems.private, { mode: 0o600 });

console.log(`✅ Development TLS cert and key generated:`);
console.log(`   ${certPath}`);
console.log(`   ${keyPath}`);
