import { Request, Response } from "express";
import {
  getProxmoxStatus,
  getProxmoxStorage,
} from "../services/proxmox.service.js";
import { overviewStatusMapper } from "../mappers/overview-status.mapper.js";
import { getFormattedServices } from "../services/dashboard.service.js";

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
      const [services, status, storage] = await Promise.all([
        getFormattedServices(),
        getProxmoxStatus(),
        getProxmoxStorage(),
      ]);

      const overview = overviewStatusMapper(status, storage);

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
