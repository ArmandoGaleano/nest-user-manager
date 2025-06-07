#!/usr/bin/env sh
set -e

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
