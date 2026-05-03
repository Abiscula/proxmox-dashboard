import fetch from "node-fetch";
import https from "https";
import dotenv from "dotenv";

dotenv.config();
const agent = new https.Agent({ rejectUnauthorized: false });

const PROXMOX_URL = process.env.PROXMOX_URL;
const TOKEN = process.env.PROXMOX_TOKEN;
const NODE = process.env.NODE_NAME;

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

  const data = await res.json();
  return data.data;
}

export async function getContainers() {
  const res = await fetch(`${PROXMOX_URL}/api2/json/nodes/${NODE}/lxc`, {
    headers,
    agent,
  });

  const data = await res.json();
  return data.data;
}
