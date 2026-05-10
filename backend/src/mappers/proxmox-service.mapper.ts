import { IDashboardService } from "../interfaces/dashboard.interface.js";
import { IProxmoxContainer } from "../interfaces/proxmox-lxc.interface.js";
import { IProxmoxVM } from "../interfaces/proxmox-vm.interface.js";
import { getServiceRedirectUrl } from "./service-redirects.mapper.js";
import { getDiskUsage, VMFileSystemInfo } from "../helper/getDiskUsage.js";
import { MachineType } from "../constants/proxmox.js";
import { resolveMachineMemory } from "../helper/resolveMachineMemory.js";

/**
 * Retorna a VM ou Container formatado para o padrão do dashboard.
 * @param machine
 * @param machineType
 * @returns
 */
export async function proxmoxServiceMapper(
  machine: IProxmoxVM | IProxmoxContainer,
  machineType: MachineType,
  fsInfo?: VMFileSystemInfo,
): Promise<IDashboardService> {
  const { diskUsed, diskTotal, diskUsage } = getDiskUsage(
    machine,
    machineType,
    fsInfo,
  );

  const memoryInfo = await resolveMachineMemory({
    vmid: machine.vmid,
    machineType,
    usedMemoryBytes: machine.mem,
    totalMemoryBytes: machine.maxmem,
  });

  return {
    id: machine.vmid,
    name: machine.name,
    type: machineType,
    status: machine.status,
    cpu: Number((machine.cpu * 100).toFixed(1)),
    memory: memoryInfo.memory,
    totalMemory: memoryInfo.totalMemory,
    uptime: machine.uptime,
    redirectUrl: getServiceRedirectUrl(machine.name),
    diskUsage,
    diskUsed,
    diskTotal,
  };
}
