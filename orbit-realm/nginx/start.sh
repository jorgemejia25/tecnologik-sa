#!/bin/bash
set -euo pipefail
DOMAIN=tecnologik.net
LIVE_DIR=/etc/letsencrypt/live/$DOMAIN
DUMMY_CREATED=0

is_le_cert() {
  # Devuelve 0 si el issuer menciona Let's Encrypt
  openssl x509 -in "$1" -noout -issuer 2>/dev/null | grep -qi "Let's Encrypt"
}

# Si no existe el cert real, generar dummy para que nginx arranque
if [ ! -f "$LIVE_DIR/fullchain.pem" ] || [ ! -f "$LIVE_DIR/privkey.pem" ]; then
  echo "[start] No se encontraron certificados para $DOMAIN. Generando dummy temporal..."
  mkdir -p "$LIVE_DIR"
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "$LIVE_DIR/privkey.pem" \
    -out "$LIVE_DIR/fullchain.pem" \
    -subj "/CN=$DOMAIN" >/dev/null 2>&1
  cp "$LIVE_DIR/fullchain.pem" "$LIVE_DIR/chain.pem" || true
  DUMMY_CREATED=1
else
  # Si existe un cert verificar si ya es de Let's Encrypt para no considerarlo dummy
  if is_le_cert "$LIVE_DIR/fullchain.pem"; then
    echo "[start] Certificado Let's Encrypt ya presente para $DOMAIN."
  else
    echo "[start] Certificado existente no es Let's Encrypt (posible dummy). Continuando..."
    DUMMY_CREATED=1
  fi
fi

# Lanzar nginx en segundo plano para permitir emisión posterior si se usa webroot
nginx -g 'daemon off;' &
NGINX_PID=$!

# Si se creó dummy, mostrar instrucciones claras (no emitimos automáticamente para no romper ACME rate limits si el DNS aún no apunta)
if [ "$DUMMY_CREATED" -eq 1 ]; then
  cat <<EOF
=================================================================
Certificado dummy activo para $DOMAIN. Emite el certificado real con:
  docker compose run --rm certbot certonly \\
    --webroot -w /var/www/certbot \\
    -d tecnologik.net -d www.tecnologik.net \\
    --email admin@tecnologik.net --agree-tos --no-eff-email
Tras emisión ya NO necesitas reiniciar manualmente: este contenedor vigila y recargará nginx al detectar Let's Encrypt.
Si quieres forzar recarga manual luego:
  docker compose exec web nginx -s reload
=================================================================
EOF

  # Watcher: verifica cada 30s si apareció un cert de Let's Encrypt y recarga nginx
  (
    while sleep 30; do
      if is_le_cert "$LIVE_DIR/fullchain.pem"; then
        echo "[watcher] Detectado certificado Let's Encrypt válido. Recargando nginx..."
        nginx -s reload || true
        break
      fi
    done
  ) &
fi

wait $NGINX_PID
