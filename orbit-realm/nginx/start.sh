#!/bin/bash
set -euo pipefail
DOMAIN=tecnologik.net
LIVE_DIR=/etc/letsencrypt/live/$DOMAIN
DUMMY_CREATED=0

PROMO_DIR="/etc/letsencrypt/live/${DOMAIN}-0001"

is_le_cert() {
  # Devuelve 0 si el issuer menciona Let's Encrypt
  openssl x509 -in "$1" -noout -issuer 2>/dev/null | grep -qi "Let's Encrypt"
}

ensure_fullchain_integrity() {
  if [ -f "$LIVE_DIR/fullchain.pem" ]; then
    local count
    count=$(grep -c "BEGIN CERTIFICATE" "$LIVE_DIR/fullchain.pem" || echo 0)
    if [ "$count" -lt 2 ] && [ -f "$LIVE_DIR/chain.pem" ]; then
      echo "[start] fullchain.pem parece incompleto (solo $count cert). Reconstruyendo concatenando leaf + chain..."
      # Intentar derivar leaf (primer cert actual) y append chain entero
      cp "$LIVE_DIR/fullchain.pem" "$LIVE_DIR/fullchain.pem.leaf.bak" || true
      # Si existe cert.pem úsalo como leaf base, si no reutiliza fullchain actual
      if [ -f "$LIVE_DIR/cert.pem" ]; then
        cat "$LIVE_DIR/cert.pem" "$LIVE_DIR/chain.pem" > "$LIVE_DIR/fullchain.pem.new" || return 0
      else
        cat "$LIVE_DIR/fullchain.pem" "$LIVE_DIR/chain.pem" > "$LIVE_DIR/fullchain.pem.new" || return 0
      fi
      mv "$LIVE_DIR/fullchain.pem.new" "$LIVE_DIR/fullchain.pem"
      echo "[start] fullchain.pem reconstruido."
    fi
  fi
}

# Si no existe el cert real, generar dummy para que nginx arranque
if [ -d "$PROMO_DIR" ] && [ -f "$PROMO_DIR/fullchain.pem" ] && is_le_cert "$PROMO_DIR/fullchain.pem"; then
  echo "[start] Detectado certificado LE en $PROMO_DIR. Promocionando a ruta canónica..."
  mkdir -p "$LIVE_DIR"
  cp "$PROMO_DIR/privkey.pem" "$LIVE_DIR/privkey.pem" || true
  cp "$PROMO_DIR/fullchain.pem" "$LIVE_DIR/fullchain.pem" || true
  cp "$PROMO_DIR/chain.pem" "$LIVE_DIR/chain.pem" || true
fi

ensure_fullchain_integrity

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
  if is_le_cert "$LIVE_DIR/fullchain.pem"; then
    echo "[start] Certificado Let's Encrypt presente para $DOMAIN."
  else
    echo "[start] Certificado existente no es Let's Encrypt (posible dummy)."; DUMMY_CREATED=1
  fi
fi

ensure_fullchain_integrity

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
