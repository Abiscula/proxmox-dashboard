# Proxmox Dashboard API

API desenvolvida para consumo próprio com o objetivo de centralizar e simplificar a visualização dos recursos do meu servidor local baseado em Proxmox.

---

## Sobre o projeto

Este projeto é uma API backend construída com Node.js e TypeScript que consome a API do Proxmox e transforma os dados em um formato mais simples e padronizado para uso em um dashboard personalizado.

A ideia principal é abstrair a complexidade da API do Proxmox e fornecer um endpoint limpo, focado em visualização e monitoramento.

---

## Objetivo

- Unificar dados de VMs e Containers (LXC)
- Normalizar o formato de resposta
- Facilitar o consumo por um frontend (dashboard)
- Criar uma camada intermediária entre o Proxmox e aplicações customizadas

---

## Arquitetura

O projeto segue uma estrutura simples e escalável:

- **routes** → definição dos endpoints
- **controllers** → controle das requisições HTTP
- **services** → integração com a API do Proxmox
- **interfaces** → tipagem com TypeScript
- **guards** → validação de respostas externas

---

## Endpoint principal

### `GET /api/dashboard`

Retorna uma lista unificada de serviços (VMs + Containers):

```json
{
  "services": [
    {
      "id": 102,
      "name": "Study-lab",
      "type": "vm",
      "status": "running",
      "cpu": 0.12,
      "memory": 2048,
      "uptime": 123456
    }
  ]
}
```

---

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- node-fetch
- dotenv

---

## Segurança

Essa API foi desenvolvida para uso em ambiente local e privado, sendo acessada apenas através de rede interna/VPN.

Não possui autenticação própria por design, assumindo que o acesso já está protegido por infraestrutura de rede (ex: VPN).

---

## Observações

- Projeto voltado exclusivamente para uso pessoal
- Não foi pensado inicialmente para produção pública
- Tipagens e validações foram implementadas para maior segurança e previsibilidade

---

## Próximos passos

- Integração com frontend (dashboard em React)
- Adição de métricas mais detalhadas
- Possível implementação de cache
- Expansão para controle de VMs (start/stop)

---
