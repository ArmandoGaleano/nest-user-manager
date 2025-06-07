#!/usr/bin/env sh
#
# development.sh — Levanta containers, aguarda o banco, aplica migrações, seeds e inicia a aplicação
#

set -e

# ─── Captura SIGINT e SIGTERM e mata todo o grupo de processos ──────────────────
trap 'echo "🛑  Interrupt detected, shutting down..."; kill 0' INT TERM

# ─── 0. Definições de caminho ───────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

# ─── 1. Carregar variáveis de ambiente (.env) ────────────────────────────────────
if [ -f .env ]; then
  printf "
⏳  Carregando variáveis de ambiente de .env...
"
  export $(grep -v '^[[:space:]]*#' .env | xargs)
fi

# ─── 2. Esperar PostgreSQL ──────────────────────────────────────────────────────
printf "
🔵  Aguardando PostgreSQL em $POSTGRES_HOST:$POSTGRES_PORT...
"
node "$PROJECT_ROOT/scripts/utils/wait-for-postgres.mjs"
printf "\033[1;32m🟢  PostgreSQL está pronto para conexões!\033[0m
"

# ─── 3. Aplicar migrations (Knex) ────────────────────────────────────────────────
printf "
========================================
"
printf "       🔧 Aplicando migrations (Knex)...       
"
printf "========================================
"
yarn knex migrate:latest --knexfile="$PROJECT_ROOT/dist/infrastructure/persistence/knex/knexfile.js"
printf "
\033[1;32m🟢  Migrations aplicadas com sucesso!\033[0m
"

# ─── 4. Rodar seeds (Knex) ───────────────────────────────────────────────────────
printf "
========================================
"
printf "         🌱 Executando seeds (Knex)...         
"
printf "========================================
"
yarn knex seed:run --knexfile="$PROJECT_ROOT/dist/infrastructure/persistence/knex/knexfile.js"
printf "
\033[1;32m🟢  Seeds executados com sucesso!\033[0m
"

# ─── 5. Iniciar aplicação (NestJS watch) ─────────────────────────────────────────
printf "
🚀  Iniciando NestJS no modo watch...
"
cd "$PROJECT_ROOT"
exec yarn start:watch:type-check
