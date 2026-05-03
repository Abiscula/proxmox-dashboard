import fetch from "node-fetch";
import https from "https";
import dotenv from "dotenv";
import { isProxmoxResponse } from "../guards/proxmox.guard.js";
import { IProxmoxVM } from "../interfaces/proxmox-vm.interface.js";
import { IProxmoxContainer } from "../interfaces/proxmox-lxc.interface.js";
import { IProxmoxNodeStatus } from "../interfaces/proxmox-status.interface.js";
import { IProxmoxStorage } from "../interfaces/proxmox-storage.interface.js";

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

export async function getVMs() {
  const res = await fetch(`${PROXMOX_URL}/api2/json/nodes/${NODE}/qemu`, {
    headers,
    agent,
  });

  const response = await res.json();

  if (!isProxmoxResponse<IProxmoxVM>(response)) {
    throw new Error("Resposta inválida");
  }

  return response.data;
}

export async function getContainers() {
  const res = await fetch(`${PROXMOX_URL}/api2/json/nodes/${NODE}/lxc`, {
    headers,
    agent,
  });

  const response = await res.json();

  if (!isProxmoxResponse<IProxmoxContainer>(response)) {
    throw new Error("Resposta inválida");
  }

  return response.data;
}

export async function getProxmoxStatus() {
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

export async function getProxmoxStorage() {
  const res = await fetch(`${PROXMOX_URL}/api2/json/nodes/${NODE}/storage`, {
    headers,
    agent,
  });

  const response = await res.json();

  if (!isProxmoxResponse<IProxmoxStorage>(response)) {
    throw new Error("Resposta inválida");
  }

  return response.data;
}
