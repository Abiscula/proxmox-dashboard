import { getVMs, getContainers } from "../services/proxmox.service.js";

export async function getVMsController(req: any, res: any) {
  try {
    const vms = await getVMs();
    res.json(vms);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getContainersController(req: any, res: any) {
  try {
    const containers = await getContainers();
    res.json(containers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
