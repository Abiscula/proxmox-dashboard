import { getVMs, getContainers } from "../services/proxmox.service.js";

export async function getDashboard(req: any, res: any) {
  try {
    const [vms, containers] = await Promise.all([getVMs(), getContainers()]);

    const formattedVMs = vms.map((vm: any) => ({
      id: vm.vmid,
      name: vm.name,
      type: "vm",
      status: vm.status,
      cpu: vm.cpu,
      memory: Math.round(vm.mem / 1024 / 1024), // MB
      uptime: vm.uptime,
    }));

    const formattedContainers = containers.map((ct: any) => ({
      id: ct.vmid,
      name: ct.name,
      type: "container",
      status: ct.status,
      cpu: ct.cpu,
      memory: Math.round(ct.mem / 1024 / 1024), // MB
      uptime: ct.uptime,
    }));

    res.json({
      services: [...formattedVMs, ...formattedContainers],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no dashboard" });
  }
}
