import { Request, Response } from "express";
import {
  getVMs,
  getContainers,
  getProxmoxStatus,
  getProxmoxStorage,
} from "../services/proxmox.service.js";
import { overviewStatusMapper } from "../mappers/overview-status.mapper.js";
import { bytesToMB } from "../helper/formatBytes.js";
import { IProxmoxVM } from "../interfaces/proxmox-vm.interface.js";
import { IProxmoxContainer } from "../interfaces/proxmox-lxc.interface.js";
import { getServiceRedirectUrl } from "../mappers/service-redirects.mapper.js";

/**
 * Configura os headers necessários para conexão SSE.
 */
function setupSSEHeaders(res: Response) {
  res.status(200);
  res.set({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "Keep-Alive": "timeout=600",
    "X-Accel-Buffering": "no",
  });

  res.flushHeaders?.();
}

/**
 * Formata os dados de VMs e Containers para o padrão do dashboard.
 */
function formatServices(vms: IProxmoxVM[], containers: IProxmoxContainer[]) {
  const formattedVMs = vms.map((vm) => ({
    id: vm.vmid,
    name: vm.name,
    type: "vm" as const,
    status: vm.status,
    cpu: Number((vm.cpu * 100).toFixed(1)),
    memory: bytesToMB(vm.mem),
    uptime: vm.uptime,
    redirectUrl: getServiceRedirectUrl(vm.name),
  }));

  const formattedContainers = containers.map((ct) => ({
    id: ct.vmid,
    name: ct.name,
    type: "container" as const,
    status: ct.status,
    cpu: Number((ct.cpu * 100).toFixed(1)),
    memory: bytesToMB(ct.mem),
    uptime: ct.uptime,
    redirectUrl: getServiceRedirectUrl(ct.name),
  }));

  return [...formattedVMs, ...formattedContainers];
}

/**
 * Envia um evento SSE com nome e payload.
 */
function sendEvent(res: Response, event: string, data: unknown) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

/**
 * Controller SSE que envia o estado completo (overview + dashboard)
 * em intervalos periódicos para o frontend.
 */
export async function streamState(req: Request, res: Response) {
  setupSSEHeaders(res);

  let closed = false;

  const send = async () => {
    if (closed) return;

    try {
      const [vms, containers, status, storage] = await Promise.all([
        getVMs(),
        getContainers(),
        getProxmoxStatus(),
        getProxmoxStorage(),
      ]);

      const overview = overviewStatusMapper(status, storage);
      const services = formatServices(vms, containers);

      sendEvent(res, "state", {
        overview,
        dashboard: { services },
      });
    } catch {
      sendEvent(res, "error", { error: "stream_error" });
    }
  };

  // envio inicial
  await send();

  // intervalo de atualização (5s)
  const interval = setInterval(send, 5000);

  // cleanup
  req.on("close", () => {
    closed = true;
    clearInterval(interval);
    res.end();
  });
}
