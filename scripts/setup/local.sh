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
  printf "\n⏳  Carregando variáveis de ambiente de .env...\n"
  export $(grep -v '^[[:space:]]*#' .env | xargs)
fi

# ─── 2. Ajuste de host para development ──────────────────────────────────────────
if [ "x$NODE_ENV" = "xdevelopment" ]; then
  printf "\n🛠️  Ambiente de desenvolvimento detectado. Usando 127.0.0.1 como POSTGRES_HOST...\n"
  POSTGRES_HOST="127.0.0.1"
  export POSTGRES_HOST
fi

# ─── 3. Esperar PostgreSQL ──────────────────────────────────────────────────────
printf "\n🔵  Aguardando PostgreSQL em $POSTGRES_HOST:$POSTGRES_PORT...\n"
node "$PROJECT_ROOT/scripts/utils/wait-for-postgres.mjs"
printf "\033[1;32m🟢  PostgreSQL está pronto para conexões!\033[0m\n\n"

# ─── 4. Aplicar migrations (Knex) ────────────────────────────────────────────────
printf "\n========================================\n"
printf "🔧  Aplicando migrations (Knex)...\n"
printf "========================================\n\n"
yarn knex migrate:latest --knexfile="$PROJECT_ROOT/dist/infrastructure/persistence/knex/knexfile.js"
printf "\033[1;32m🟢  Migrations aplicadas com sucesso!\033[0m\n\n"

# ─── 5. Rodar seeds (Knex) ───────────────────────────────────────────────────────
printf "\n========================================\n"
printf "🌱  Executando seeds (Knex)...\n"
printf "========================================\n\n"
yarn knex seed:run --knexfile="$PROJECT_ROOT/dist/infrastructure/persistence/knex/knexfile.js"
printf "\033[1;32m🟢  Seeds executados com sucesso!\033[0m\n\n"

# ─── 7. Iniciar aplicação (NestJS watch) ─────────────────────────────────────────
printf "\n🚀  Iniciando NestJS em modo watch...\n"
cd "$PROJECT_ROOT"

# substitui este shell pelo processo do yarn, mantendo o mesmo PGID
exec yarn start:watch:type-check
