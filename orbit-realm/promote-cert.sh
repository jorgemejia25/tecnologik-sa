#!/usr/bin/env bash
set -euo pipefail
DOMAIN="tecnologik.net"
CANON="/etc/letsencrypt/live/${DOMAIN}"
ALT="/etc/letsencrypt/live/${DOMAIN}-0001"
SERVICE=web

red(){ printf "\e[31m%s\e[0m\n" "$*"; }
green(){ printf "\e[32m%s\e[0m\n" "$*"; }
yellow(){ printf "\e[33m%s\e[0m\n" "$*"; }

require() { command -v "$1" >/dev/null 2>&1 || { red "Falta comando $1"; exit 1; }; }
require docker

if ! docker compose ps $SERVICE >/dev/null 2>&1; then
  red "Servicio $SERVICE no encontrado"; exit 1; fi

if ! docker compose exec -T $SERVICE sh -c "test -d '$ALT'"; then
  red "No existe $ALT dentro del contenedor. Nada que promover."; exit 1; fi

if docker compose exec -T $SERVICE sh -c "test -f '$ALT/fullchain.pem'"; then
  yellow "Copiando certificados desde $ALT a $CANON ..."
  docker compose exec -T $SERVICE sh -c "mkdir -p '$CANON'"
  docker compose exec -T $SERVICE sh -c "cp $ALT/privkey.pem $CANON/privkey.pem"
  docker compose exec -T $SERVICE sh -c "cp $ALT/chain.pem $CANON/chain.pem || true"
  docker compose exec -T $SERVICE sh -c "cp $ALT/fullchain.pem $CANON/fullchain.pem"
else
  red "No se encontró fullchain.pem en $ALT"; exit 1; fi

docker compose exec -T $SERVICE sh -c "grep -c 'BEGIN CERTIFICATE' $CANON/fullchain.pem" || true

docker compose exec -T $SERVICE nginx -s reload || true

yellow "Issuer actual:";
docker compose exec -T $SERVICE sh -c "openssl x509 -in $CANON/fullchain.pem -noout -issuer -subject"

green "Listo. Si issuer contiene Let's Encrypt la promoción fue exitosa."
