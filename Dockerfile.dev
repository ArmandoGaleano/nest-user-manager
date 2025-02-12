# Use a imagem base do Node.js
FROM node:20.18.0

# Instala o Yarn globalmente no container
RUN corepack enable && corepack prepare yarn@stable --activate

# Instala o cliente PostgreSQL no container para rodar `pg_isready`
RUN apt-get update && apt-get install -y postgresql-client

# Criação do diretório de trabalho
WORKDIR /nest-user-manager

# Copia os arquivos da aplicação
COPY . .

# Instala as dependências da aplicação
RUN yarn

# Permite a execução do script de inicialização
RUN chmod +x ./setup/development.sh

# Inicializa a aplicação
ENTRYPOINT ["./setup/development.sh"]
