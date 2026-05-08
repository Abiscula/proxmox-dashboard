# Proxmox Dashboard API

Aplicação desenvolvida para consumo próprio com o objetivo de centralizar e simplificar a visualização dos recursos do meu servidor local baseado em Proxmox.

---

## Preview

<div align="center">
  <img src="./frontend/src/assets/projeto.jpeg" width="800"/>
</div>

---

## Sobre o projeto

Este projeto consiste em uma aplicação fullstack com backend em Node.js + TypeScript e frontend em React, que consome a API do Proxmox e apresenta os dados em um dashboard personalizado.

A ideia principal é abstrair a complexidade da API do Proxmox e fornecer uma visualização simples, padronizada e de fácil leitura para monitoramento do ambiente.

---

## Objetivo

- Unificar dados de VMs e Containers (LXC)
- Normalizar o formato de resposta
- Exibir os dados em um dashboard visual
- Criar uma camada intermediária entre o Proxmox e aplicações customizadas

---

## Arquitetura

O projeto segue uma estrutura simples e escalável:

- **backend/**
  - **routes** → definição dos endpoints
  - **controllers** → controle das requisições HTTP
  - **services** → integração com a API do Proxmox
  - **interfaces** → tipagem com TypeScript
  - **guards** → validação de respostas externas

- **frontend/**
  - **components** → componentes reutilizáveis (ex: Card)
  - **pages** → páginas da aplicação (ex: Dashboard)
  - **services** → consumo da API
  - **formatter/helpers** → formatação e manipulação de dados

---

## Endpoints

A API disponibiliza os seguintes endpoints:

```ts
"/api/dashboard";
"/api/overview";
"/api/services-status";
```

---

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- node-fetch
- dotenv
- React
- Vite
- styled-components

---

## Segurança

Essa aplicação foi desenvolvida para uso em ambiente local e privado, sendo acessada apenas através de rede interna/VPN.

Não possui autenticação própria por design, assumindo que o acesso já está protegido por infraestrutura de rede (ex: VPN).

---

## Observações

- Projeto voltado exclusivamente para uso pessoal
- Não foi pensado inicialmente para produção pública
- Tipagens e validações foram implementadas para maior segurança e previsibilidade
- Frontend e backend estão organizados em um único repositório (monorepo simples)

---

## Atualização em tempo real

A aplicação utiliza **Server-Sent Events (SSE)** para atualização automática dos dados do dashboard em tempo real.

As informações de status e recursos dos serviços são atualizadas periodicamente sem necessidade de refresh manual da página, garantindo uma visualização mais dinâmica do ambiente.

Atualmente os dados são sincronizados a cada **5 segundos**.

---

## Deploy automático (CI/CD)

O projeto possui deploy automatizado utilizando GitHub Actions com Self-Hosted Runner hospedado na própria infraestrutura local.

A cada `push` realizado na branch principal:

- O workflow é executado automaticamente
- O runner dispara o script de deploy no servidor
- Os containers Docker são rebuildados apenas quando necessário (frontend/backend)

Fluxo simplificado:

```text
git push
   ↓
GitHub Actions
   ↓
Self-Hosted Runner
   ↓
deploy.sh
   ↓
Docker Compose
```
