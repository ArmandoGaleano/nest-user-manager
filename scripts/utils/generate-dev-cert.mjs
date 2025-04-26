/**
 * scripts/setup/generate-dev-cert.js
 *
 * Gera automaticamente um certificado SSL + chave para "localhost" e "127.0.0.1",
 * depositando em ../../docker/nginx/certs/cert.pem e key.pem.
 */

import fs from 'fs';
import path from 'path';
import selfsigned from 'selfsigned';

const outDir = path.resolve(process.cwd(), './docker/nginx/certs');
const certPath = path.join(outDir, 'cert-dev.pem');
const keyPath = path.join(outDir, 'key-dev.pem');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('🔐 Gerando certificado auto-assinado para desenvolvimento…');

const attrs = [{ name: 'commonName', value: 'localhost' }];
const extensions = [
  {
    name: 'subjectAltName',
    altNames: [
      { type: 2, value: 'localhost' }, // DNS
      { type: 7, ip: '127.0.0.1' }, // IP
    ],
  },
];
const opts = { days: 365, keySize: 2048, extensions };

const pems = selfsigned.generate(attrs, opts);

// grava os arquivos
fs.writeFileSync(certPath, pems.cert, { mode: 0o644 });
fs.writeFileSync(keyPath, pems.private, { mode: 0o600 });

console.log(
  `✅ Certificado e chave gerados em:\n   ${certPath}\n   ${keyPath}`,
);
