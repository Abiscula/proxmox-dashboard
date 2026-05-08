#!/bin/bash

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

if echo "$CHANGED_FILES" | grep -q "^agent/"; then
  echo "Atualizando agent..."

  ./agent/deploy-agent.sh

  sudo systemctl restart proxmox-agent
fi

echo "Deploy finalizado com sucesso!"
