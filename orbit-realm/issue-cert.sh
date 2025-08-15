#!/usr/bin/env bash
set -euo pipefail

DOMAINS=(tecnologik.net www.tecnologik.net)
EMAIL="admin@tecnologik.net"
WEBROOT="/var/www/certbot"
SERVICE_WEB="web"
SERVICE_CERTBOT="certbot"
FALLBACK_STANDALONE=0

red() { printf "\e[31m%s\e[0m\n" "$*"; }
green() { printf "\e[32m%s\e[0m\n" "$*"; }
yellow() { printf "\e[33m%s\e[0m\n" "$*"; }

require() { command -v "$1" >/dev/null 2>&1 || { red "Falta comando $1"; exit 1; }; }
require docker

if ! docker compose config --services | grep -qx "$SERVICE_CERTBOT"; then
  yellow "El servicio '$SERVICE_CERTBOT' no existe en docker-compose.yml."
  cat <<'EOF'
Para añadirlo, incorpora este bloque en docker-compose.yml:

  certbot:
    image: certbot/certbot:latest
    container_name: orbit-certbot
    volumes:
      - certbot_www:/var/www/certbot
      - certbot_etc:/etc/letsencrypt
    networks:
      - orbit-network
    restart: unless-stopped

  certbot_renew:
    image: certbot/certbot:latest
    container_name: orbit-certbot-renew
    entrypoint: /bin/sh
    command: -c "while :; do certbot renew --webroot -w /var/www/certbot --quiet --agree-tos; sleep 12h; done"
    volumes:
      - certbot_www:/var/www/certbot
      - certbot_etc:/etc/letsencrypt
    networks:
      - orbit-network
    restart: unless-stopped

Si no deseas editar ahora, se intentará modo standalone (requiere liberar puerto 80).
EOF
  read -p "¿Usar modo standalone temporal? (y/N): " ans
  if [[ ${ans:-N} =~ ^[Yy]$ ]]; then
    FALLBACK_STANDALONE=1
  else
    red "Abortado. Añade el servicio y vuelve a ejecutar."
    exit 1
  fi
fi

if [ "$FALLBACK_STANDALONE" -eq 0 ]; then
  # Verificar publicación de puerto 80
  if ! docker compose port "$SERVICE_WEB" 80 >/dev/null 2>&1; then
    red "El servicio '$SERVICE_WEB' no expone el puerto 80. Revisa la sección 'ports:' en docker-compose.yml"
    exit 1
  fi

  PORT80=$(docker compose port "$SERVICE_WEB" 80 | awk -F: '{print $NF}')
  if [ -z "$PORT80" ]; then
    red "No se pudo determinar el puerto 80 publicado."; exit 1; fi

  yellow "Probando webroot local...";
  docker compose exec "$SERVICE_WEB" sh -c "mkdir -p $WEBROOT/.well-known/acme-challenge && echo PROBE_OK > $WEBROOT/.well-known/acme-challenge/ACME_PROBE" >/dev/null
  HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT80/.well-known/acme-challenge/ACME_PROBE || true)
  if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "301" ]; then
    red "El webroot no sirve archivos correctamente (HTTP $HTTP_CODE)."; exit 1; fi

  yellow "Emitiendo certificado para: ${DOMAINS[*]}";
  ARGS=(certonly --webroot -w "$WEBROOT" --agree-tos --no-eff-email --email "$EMAIL")
  for d in "${DOMAINS[@]}"; do ARGS+=(-d "$d"); done
  set -x
  docker compose run --rm "$SERVICE_CERTBOT" "${ARGS[@]}"
  set +x
  green "Certificado emitido (si no hubo errores). Reinicia nginx:";
  echo "  docker compose restart $SERVICE_WEB";
else
  yellow "Modo standalone: deteniendo temporalmente nginx si está activo";
  docker compose stop "$SERVICE_WEB" || true
  docker volume inspect certbot_etc >/dev/null 2>&1 || docker volume create certbot_etc >/dev/null
  docker volume inspect certbot_www >/dev/null 2>&1 || docker volume create certbot_www >/dev/null
  CMD=(docker run --rm -p 80:80 -v certbot_etc:/etc/letsencrypt -v certbot_www:/var/www/certbot certbot/certbot certonly --standalone --agree-tos --no-eff-email --email "$EMAIL")
  for d in "${DOMAINS[@]}"; do CMD+=(-d "$d"); done
  set -x
  "${CMD[@]}"
  set +x
  green "Certificado emitido (standalone). Levantando nginx:";
  docker compose up -d "$SERVICE_WEB"
fi
