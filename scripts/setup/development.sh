#!/bin/sh

# Carrega as variáveis de ambiente do .env, se existir
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "🔵 Aguardando PostgreSQL ($POSTGRES_HOST:$POSTGRES_PORT) ficar pronto..."

# Loop para testar a conexão com o banco usando pg_isready, passando a senha
until PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT 1" > /dev/null 2>&1; do
  echo "🔵 Aguardando PostgreSQL ($POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB) ficar pronto..."
  sleep 5
done

cd /nest-user-manager

echo "🟢 Banco de dados está pronto!"
echo "🔵 Aplicando migrações..."

yarn knex migrate:latest --knexfile=./dist/knex/knexfile.cjs

if [ $? -ne 0 ]; then
  echo "🔴 Erro ao aplicar migrações!"
  exit 1
fi
echo "🟢 Migrações aplicadas com sucesso!"

echo "🚀 Iniciando a aplicação..."

npm run start:watch
