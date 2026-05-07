import fetch from "node-fetch";
import https from "https";
import dotenv from "dotenv";
import { isProxmoxResponse } from "../guards/proxmox.guard.js";
import { IProxmoxVM } from "../interfaces/proxmox-vm.interface.js";
import { IProxmoxContainer } from "../interfaces/proxmox-lxc.interface.js";
import { IProxmoxNodeStatus } from "../interfaces/proxmox-status.interface.js";
import { IProxmoxStorage } from "../interfaces/proxmox-storage.interface.js";
import { VMFileSystemInfo } from "../helper/getDiskUsage.js";

dotenv.config();
const agent = new https.Agent({ rejectUnauthorized: false });

const PROXMOX_URL = process.env.PROXMOX_URL;
const TOKEN = process.env.PROXMOX_TOKEN;
const NODE = process.env.NODE_NAME;

if (!TOKEN) {
  throw new Error("PROXMOX_TOKEN não definido");
}

const headers = {
  Authorization: TOKEN,
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
};

/**
 * Busca todas as máquinas virtuais (QEMU/KVM) do node configurado.
 */
export async function getVMs(): Promise<IProxmoxVM[]> {
  const res = await fetch(`${PROXMOX_URL}/api2/json/nodes/${NODE}/qemu`, {
    headers,
    agent,
  });

  const response = await res.json();

  if (!isProxmoxResponse<IProxmoxVM[]>(response)) {
    throw new Error("Resposta inválida");
  }

  return response.data;
}

/**
 * Busca todos os containers LXC do node configurado.
 */
export async function getContainers(): Promise<IProxmoxContainer[]> {
  const res = await fetch(`${PROXMOX_URL}/api2/json/nodes/${NODE}/lxc`, {
    headers,
    agent,
  });

  const response = await res.json();

  if (!isProxmoxResponse<IProxmoxContainer[]>(response)) {
    throw new Error("Resposta inválida");
  }

  return response.data;
}

/**
 * Retorna métricas gerais do node Proxmox,
 * como CPU, memória e uptime.
 */
export async function getProxmoxStatus(): Promise<IProxmoxNodeStatus> {
  const res = await fetch(`${PROXMOX_URL}/api2/json/nodes/${NODE}/status`, {
    headers,
    agent,
  });

  const response = await res.json();

  if (!isProxmoxResponse<IProxmoxNodeStatus>(response)) {
    throw new Error("Resposta inválida");
  }

  return response.data;
}

/**
 * Retorna informações dos storages configurados no Proxmox.
 */
export async function getProxmoxStorage(): Promise<IProxmoxStorage[]> {
  const res = await fetch(`${PROXMOX_URL}/api2/json/nodes/${NODE}/storage`, {
    headers,
    agent,
  });

  const response = await res.json();

  if (!isProxmoxResponse<IProxmoxStorage[]>(response)) {
    throw new Error("Resposta inválida");
  }

  return response.data;
}

/**
 * Busca informações do filesystem interno da VM
 * utilizando o QEMU Guest Agent.
 */
export async function getVMFileSystem(vmid: number): Promise<VMFileSystemInfo> {
  const res = await fetch(
    `${PROXMOX_URL}/api2/json/nodes/${NODE}/qemu/${vmid}/agent/get-fsinfo`,
    {
      headers,
      agent,
    },
  );

  const response = await res.json();

  if (!isProxmoxResponse<VMFileSystemInfo>(response)) {
    throw new Error("Resposta inválida");
  }

  return response.data;
}
