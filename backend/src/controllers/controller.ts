import {
  IDashboardResponse,
  IDashboardService,
} from "../interfaces/dashboard.interface.js";
import { IProxmoxContainer } from "../interfaces/proxmox-lxc.interface.js";
import { IProxmoxVM } from "../interfaces/proxmox-vm.interface.js";
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

    const formattedVMs: IDashboardService[] = vms.map((vm: IProxmoxVM) => ({
      id: vm.vmid,
      name: vm.name,
      type: "vm",
      status: vm.status,
      cpu: vm.cpu,
      memory: Math.round(vm.mem / 1024 / 1024),
      uptime: vm.uptime,
    }));

    const formattedContainers: IDashboardService[] = containers.map(
      (ct: IProxmoxContainer) => ({
        id: ct.vmid,
        name: ct.name,
        type: "container",
        status: ct.status,
        cpu: ct.cpu,
        memory: Math.round(ct.mem / 1024 / 1024),
        uptime: ct.uptime,
      }),
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
