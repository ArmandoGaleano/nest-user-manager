# Use a imagem base do Node.js
FROM node:20.18.0

# Habilita o Yarn com Corepack
RUN corepack enable && corepack prepare yarn@stable --activate

# Cria usuário e grupo sem privilégios
RUN addgroup --system app && \
    adduser --system --ingroup app --disabled-password --gecos "" appuser

# Define o diretório de trabalho
WORKDIR /nest-user-manager

# Copia apenas arquivos de dependência primeiro para cache eficiente
COPY package.json yarn.lock ./

# Instala as dependências antes de copiar o código
RUN yarn install --frozen-lockfile

# Agora copia o resto do projeto
COPY ./dist ./src
COPY ./scripts ./scripts

# Torna o script de setup executável
RUN chmod +x scripts/setup/production.sh

# Define o usuário não-root
USER appuser

# Ponto de entrada do container
ENTRYPOINT ["sh", "scripts/setup/production.sh"]
