import { getVMs, getContainers } from "../services/proxmox.service.js";

export async function getVMsController(req, res) {
  try {
    const vms = await getVMs();
    res.json(vms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getContainersController(req, res) {
  try {
    const containers = await getContainers();
    res.json(containers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getDashboard(req, res) {
  try {
    const [vms, containers] = await Promise.all([getVMs(), getContainers()]);

    res.json({
      vms,
      containers,
    });
  } catch (err) {
    res.status(500).json({ error: "Erro no dashboard" });
  }
}
