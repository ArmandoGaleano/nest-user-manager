#!/bin/bash
set -e

# Executa apenas se o banco ainda não existe
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  -- Cria o usuário da aplicação
  CREATE USER $APP_DB_USER WITH PASSWORD '${APP_DB_PASSWORD}';

  -- Permissões básicas no banco
  GRANT CONNECT ON DATABASE $POSTGRES_DB TO $APP_DB_USER;

  -- Permissões no schema public
  GRANT USAGE ON SCHEMA public TO $APP_DB_USER;
  GRANT CREATE ON SCHEMA public TO $APP_DB_USER;

  -- Permissões nas tabelas existentes
  GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO $APP_DB_USER;

  -- Permissões em futuras tabelas
  ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $APP_DB_USER;
EOSQL
