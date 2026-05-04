#!/bin/bash

echo "Atualizando código..."
git pull

echo "Rebuildando containers..."
docker compose up -d --build

echo "Limpando imagens antigas..."
docker image prune -f

echo "Deploy finalizado com sucesso!"
