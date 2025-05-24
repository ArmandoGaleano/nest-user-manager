#!/usr/bin/env sh
#
# production.sh —  Aguarda o banco, aplica migrações e inicia a aplicação
#
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

# ─── 2. Esperar PostgreSQL ──────────────────────────────────────────────────────
printf "
🔵  Aguardando PostgreSQL em $POSTGRES_HOST:$POSTGRES_PORT...
"
echo "$POSTGRES_HOST"
echo "$NODE_ENV"

# Loop para testar a conexão com o banco usando pg_isready, passando a senha
until PGPASSWORD="$POSTGRES_PASSWORD" pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER"; do
  echo "🔵 Aguardando PostgreSQL ($POSTGRES_HOST:$POSTGRES_PORT) ficar pronto..."
  sleep 5
done


# ─── 3. Aplicar migrations (Knex) ────────────────────────────────────────────────
printf "
========================================
"
printf "       🔧 Aplicando migrations (Knex)...       
"
printf "========================================
"
npx knex migrate:latest --knexfile="$PROJECT_ROOT/src/infrastructure/persistence/knex/knexfile.js"
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
npx knex seed:run --knexfile="$PROJECT_ROOT/dist/src/infrastructure/persistence/knex/knexfile.js"
printf "
\033[1;32m🟢  Seeds executados com sucesso!\033[0m
"

# ─── 5. Iniciar aplicação (NestJS watch) ─────────────────────────────────────────
printf "
🚀  Iniciando Servidor...
"
cd /nest-user-manager
node ./src/main.js