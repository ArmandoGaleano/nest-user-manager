#!/usr/bin/env sh
#
# development.sh — Levanta containers, aguarda o banco, aplica migrações, seeds e inicia a aplicação
#

set -e

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

# ─── 2. Ajuste de host para development ──────────────────────────────────────────
if [ "x$NODE_ENV" = "xdevelopment" ]; then
  printf "
🛠️  Ambiente de desenvolvimento detectado. Usando 127.0.0.1 como POSTGRES_HOST...
"
  POSTGRES_HOST="127.0.0.1"
  export POSTGRES_HOST
fi

# ─── 3. Iniciar containers Docker ───────────────────────────────────────────────
printf "
🐳  Iniciando containers Docker em segundo plano...
"
docker-compose -f docker-compose.yml -f docker-compose.dev.yml --profile development up --build -d

printf "\033[1;32m✅  Containers iniciados com sucesso!\033[0m
"

# ─── 4. Esperar PostgreSQL ──────────────────────────────────────────────────────
printf "
🔵  Aguardando PostgreSQL em $POSTGRES_HOST:$POSTGRES_PORT...
"
node "$PROJECT_ROOT/scripts/utils/wait-for-postgres.mjs"
printf "\033[1;32m🟢  PostgreSQL está pronto para conexões!\033[0m
"

# ─── 5. Aplicar migrations (Knex) ────────────────────────────────────────────────
printf "
========================================
"
printf "       🔧 Aplicando migrations (Knex)...       
"
printf "========================================
"
npx knex migrate:latest --knexfile="$PROJECT_ROOT/dist/infrastructure/persistence/knex/knexfile.js"
printf "
\033[1;32m🟢  Migrations aplicadas com sucesso!\033[0m
"

# ─── 6. Rodar seeds (Knex) ───────────────────────────────────────────────────────
printf "
========================================
"
printf "         🌱 Executando seeds (Knex)...         
"
printf "========================================
"
npx knex seed:run --knexfile="$PROJECT_ROOT/dist/infrastructure/persistence/knex/knexfile.js"
printf "
\033[1;32m🟢  Seeds executados com sucesso!\033[0m
"

# ─── 7. Iniciar aplicação (NestJS watch) ─────────────────────────────────────────
printf "
🚀  Iniciando NestJS em modo watch...
"
npm run start:watch
