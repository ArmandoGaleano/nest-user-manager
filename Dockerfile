# Use a imagem base do Node.js
FROM node:20.18.0

# Instala o Yarn globalmente no container
RUN corepack enable && corepack prepare yarn@stable --activate

# Instala o cliente PostgreSQL no container para rodar `pg_isready`
RUN apt-get update && apt-get install -y postgresql-client

# Criação do diretório de trabalho
WORKDIR /nest-user-manager

# Copia os arquivos da aplicação
COPY ./scripts/setup/production.sh ./scripts/setup/production.sh
COPY ./scripts/utils/wait-for-postgres.mjs ./scripts/utils/wait-for-postgres.mjs
COPY ./dist .
COPY ./package.json .

# Instala as dependências da aplicação
RUN npm install --omit=dev

# Permite a execução do script de inicialização
RUN chmod +x ./scripts/setup/production.sh

# Inicializa a aplicação
ENTRYPOINT ["./scripts/setup/production.sh"]
