import { getVMs, getContainers, getVMFileSystem } from "./proxmox.service.js";

import { proxmoxServiceMapper } from "../mappers/proxmox-service.mapper.js";
import { MachineType } from "../constants/proxmox.js";

/**
 * Retorna todos os serviços formatados para consumo do dashboard,
 * incluindo informações adicionais de filesystem para VMs.
 */
export async function getFormattedServices() {
  const [vms, containers] = await Promise.all([getVMs(), getContainers()]);

  const vmFileSystems = await Promise.all(
    vms.map(async (vm) => ({
      vmid: vm.vmid,
      fsInfo: await getVMFileSystem(vm.vmid),
    })),
  );

  const formattedVMs = vms.map((vm) => {
    const fsInfo = vmFileSystems.find((item) => item.vmid === vm.vmid)?.fsInfo;

    return proxmoxServiceMapper(vm, MachineType.VM, fsInfo);
  });

  const formattedContainers = containers.map((ct) =>
    proxmoxServiceMapper(ct, MachineType.Container),
  );

  return [...formattedVMs, ...formattedContainers];
}
