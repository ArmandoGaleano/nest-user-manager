import { readdirSync, renameSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join, extname } from 'path';

// Renomeia recursivamente arquivos .js para .cjs no diretório informado
function renameJsToCjs(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      renameJsToCjs(fullPath);
    } else if (extname(entry.name) === '.js') {
      const newPath = fullPath.slice(0, -3) + '.cjs';
      renameSync(fullPath, newPath);
    }
  }
}

// Procura recursivamente um arquivo pelo nome
function findFileRecursive(dir, filename) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const result = findFileRecursive(fullPath, filename);
      if (result) return result;
    } else if (entry.name === filename) {
      return fullPath;
    }
  }
  return null;
}

// Move recursivamente os arquivos .cjs de uma pasta para outra, preservando a estrutura de subpastas
function moveMigrations(srcDir, destDir) {
  const entries = readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);
    if (entry.isDirectory()) {
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true });
      }
      moveMigrations(srcPath, destPath);
    } else if (extname(entry.name) === '.cjs') {
      renameSync(srcPath, destPath);
      console.log(`✅ Migration movida: ${srcPath} → ${destPath}`);
    }
  }
}

function buildKnex() {
  const tmpDir = 'dist/knex-tmp'; // Pasta de saída gerada pelo tsc
  const finalDir = 'dist/knex'; // Pasta final onde queremos tudo
  const outputKnexfile = join(finalDir, 'knexfile.cjs');
  const outputMigrationsDir = join(finalDir, 'migrations');

  // Verifica se a pasta temporária existe
  if (!existsSync(tmpDir)) {
    console.error(
      `Diretório de saída não encontrado: ${tmpDir}. Verifique o tsconfig.knex.json.`,
    );
    process.exit(1);
  }

  console.log('🔃 Renomeando arquivos .js para .cjs em', tmpDir);
  renameJsToCjs(tmpDir);

  // Cria a pasta final, se ainda não existir
  if (!existsSync(finalDir)) {
    mkdirSync(finalDir, { recursive: true });
  }

  console.log('🚚 Procurando o knexfile compilado...');
  // O knexfile deve ter sido compilado para dist/knex-tmp/knexfile.cjs
  const knexfilePath = findFileRecursive(tmpDir, 'knexfile.cjs');
  if (!knexfilePath) {
    console.error('❌ knexfile.cjs não encontrado após a renomeação.');
    process.exit(1);
  }
  // Move o knexfile para dist/knex/knexfile.cjs
  renameSync(knexfilePath, outputKnexfile);
  console.log('✅ Knexfile movido para', outputKnexfile);

  console.log('🚚 Movendo migrations...');
  // As migrations devem estar em: dist/knex-tmp/migrations
  const migrationsSrcDir = join(tmpDir, 'migrations');
  if (existsSync(migrationsSrcDir)) {
    if (!existsSync(outputMigrationsDir)) {
      mkdirSync(outputMigrationsDir, { recursive: true });
    }
    moveMigrations(migrationsSrcDir, outputMigrationsDir);
  } else {
    console.log(
      'ℹ️ Nenhuma pasta de migrations encontrada em',
      migrationsSrcDir,
    );
  }

  console.log('🧹 Limpando pasta temporária...');
  rmSync(tmpDir, { recursive: true, force: true });

  console.log('🚀 Build finalizado! Tudo foi gerado em', finalDir);
}

buildKnex();
