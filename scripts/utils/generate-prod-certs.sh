#!/usr/bin/env sh
set -e

# Carrega as variáveis do .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Garante que a variável DOMAIN está definida
if [ -z "$DOMAIN" ] || [ -z "$LETSENCRYPT_EMAIL" ]; then
  echo "❌ As variáveis DOMAIN ou LETSENCRYPT_EMAIL não estão definidas."
  exit 1
fi

# Só emite se NÃO existir o fullchain.pem
if [ ! -f ./certs-production/live/${DOMAIN}/fullchain.pem ]; then
  docker run --rm \
    -p 80:80 \
    -v certs-production:/etc/letsencrypt \
    -v certbot-var:/var/lib/letsencrypt \
    certbot/certbot certonly \
      --standalone \
      --preferred-challenges http \
      --non-interactive \
      --agree-tos \
      --email "$LETSENCRYPT_EMAIL" \
      -d "$DOMAIN" -d "www.$DOMAIN"
fi
