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

    const formattedVMs = vms.map((vm) => ({
      id: vm.vmid,
      name: vm.name,
      type: "vm",
      status: vm.status,
      cpu: vm.cpu,
      memory: vm.mem,
    }));

    const formattedContainers = containers.map((ct) => ({
      id: ct.vmid,
      name: ct.name,
      type: "container",
      status: ct.status,
      cpu: ct.cpu,
      memory: ct.mem,
    }));

    res.json({
      services: [...formattedVMs, ...formattedContainers],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no dashboard" });
  }
}
