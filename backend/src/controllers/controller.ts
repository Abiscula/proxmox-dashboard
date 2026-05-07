import { IDashboardResponse } from "../interfaces/dashboard.interface.js";
import { overviewStatusMapper } from "../mappers/overview-status.mapper.js";
import {
  getProxmoxStatus,
  getProxmoxStorage,
} from "../services/proxmox.service.js";
import { Request, Response } from "express";
import { getFormattedServices } from "../services/dashboard.service.js";

export async function getDashboard(
  req: Request,
  res: Response<IDashboardResponse>,
) {
  try {
    const services = await getFormattedServices();

    res.json({
      services,
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
