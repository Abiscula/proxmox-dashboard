import {
  MachineType,
  proxmoxServiceMapper,
} from "../mappers/proxmox-service.mapper.js";
import { IDashboardResponse } from "../interfaces/dashboard.interface.js";
import { overviewStatusMapper } from "../mappers/overview-status.mapper.js";
import {
  getVMs,
  getContainers,
  getProxmoxStatus,
  getProxmoxStorage,
} from "../services/proxmox.service.js";
import { Request, Response } from "express";

export async function getDashboard(
  req: Request,
  res: Response<IDashboardResponse>,
) {
  try {
    const [vms, containers] = await Promise.all([getVMs(), getContainers()]);

    const formattedVMs = vms.map((vm) =>
      proxmoxServiceMapper(vm, MachineType.VM),
    );

    const formattedContainers = containers.map((ct) =>
      proxmoxServiceMapper(ct, MachineType.Container),
    );

    res.json({
      services: [...formattedVMs, ...formattedContainers],
    });
  } catch (err) {
    res.status(500).json({ error: "Erro no dashboard" });
  }
}

export async function getOverview(req: Request, res: Response) {
  try {
    const [status, storage] = await Promise.all([
      getProxmoxStatus(),
      getProxmoxStorage(),
    ]);

    const overview = overviewStatusMapper(status, storage);

    res.json(overview);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar overview" });
  }
}
