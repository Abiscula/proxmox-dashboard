#!/bin/bash

echo "Entrando na pasta do agent..."
cd /home/abiscula/proxmox-dashboard/agent

echo "Instalando dependências..."
npm install

echo "Buildando agent..."
npm run build
