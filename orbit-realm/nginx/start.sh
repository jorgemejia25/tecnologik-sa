#!/bin/bash
set -euo pipefail
DOMAIN=tecnologik.net
LIVE_DIR=/etc/letsencrypt/live/$DOMAIN
DUMMY_CREATED=0

# Si no existe el cert real, generar dummy para que nginx arranque
if [ ! -f "$LIVE_DIR/fullchain.pem" ] || [ ! -f "$LIVE_DIR/privkey.pem" ]; then
  echo "[start] No se encontraron certificados reales para $DOMAIN. Generando dummy temporal..."
  mkdir -p "$LIVE_DIR"
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "$LIVE_DIR/privkey.pem" \
    -out "$LIVE_DIR/fullchain.pem" \
    -subj "/CN=$DOMAIN" >/dev/null 2>&1
  cp "$LIVE_DIR/fullchain.pem" "$LIVE_DIR/chain.pem" || true
  DUMMY_CREATED=1
fi

# Lanzar nginx en segundo plano para permitir emisión posterior si se usa webroot
nginx -g 'daemon off;' &
NGINX_PID=$!

# Si se creó dummy, mostrar instrucciones claras (no emitimos automáticamente para no romper ACME rate limits si el DNS aún no apunta)
if [ "$DUMMY_CREATED" -eq 1 ]; then
  cat <<EOF
=================================================================
Certificado dummy generado. Ahora emite el certificado real con:
  docker compose run --rm certbot certonly \\
    --webroot -w /var/www/certbot \\
    -d tecnologik.net -d www.tecnologik.net \\
    --email admin@tecnologik.net --agree-tos --no-eff-email
Luego reinicia nginx:
  docker compose restart web
=================================================================
EOF
fi

wait $NGINX_PID
