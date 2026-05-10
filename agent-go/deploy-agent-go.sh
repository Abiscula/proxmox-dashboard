#!/bin/bash

set -e

echo "Entrando na pasta do agent-go..."
cd /home/abiscula/proxmox-dashboard/agent-go

echo "Baixando dependências..."
go mod tidy

echo "Buildando binário..."
go build -o agent
