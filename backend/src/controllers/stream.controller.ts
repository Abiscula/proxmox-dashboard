import { Request, Response } from "express";
import {
  getVMs,
  getContainers,
  getProxmoxStatus,
  getProxmoxStorage,
} from "../services/proxmox.service.js";
import { overviewStatusMapper } from "../mappers/overview-status.mapper.js";
import { IProxmoxVM } from "../interfaces/proxmox-vm.interface.js";
import { IProxmoxContainer } from "../interfaces/proxmox-lxc.interface.js";
import {
  MachineType,
  proxmoxServiceMapper,
} from "../mappers/proxmox-service.mapper.js";

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
  const formattedVMs = vms.map((vm) =>
    proxmoxServiceMapper(vm, MachineType.VM),
  );

  const formattedContainers = containers.map((ct) =>
    proxmoxServiceMapper(ct, MachineType.Container),
  );

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
