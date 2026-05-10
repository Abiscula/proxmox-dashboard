#!/bin/bash

set -e

echo "Atualizando código..."
git pull

CHANGED_FILES=$(git diff --name-only HEAD@{1} HEAD)

if echo "$CHANGED_FILES" | grep -q "^backend/"; then
  echo "Rebuildando backend..."
  docker compose up -d --build backend
fi

if echo "$CHANGED_FILES" | grep -q "^frontend/"; then
  echo "Rebuildando frontend..."
  docker compose up -d --build frontend
fi

echo "Limpando imagens antigas..."
docker image prune -f


echo "Atualizando agent..."

./agent-go/deploy-agent-go.sh

sudo systemctl restart proxmox-agent


echo "Deploy finalizado com sucesso!"
