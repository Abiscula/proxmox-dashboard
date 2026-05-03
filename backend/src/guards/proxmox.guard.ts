import { IProxmoxResponse } from "../interfaces/proxmox.interface.js";

export function isProxmoxResponse<T>(data: any): data is IProxmoxResponse<T> {
  return data && typeof data === "object" && "data" in data;
}
