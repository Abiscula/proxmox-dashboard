import { IDashboardService } from "../interfaces/dashboard.interface.js";
import { IProxmoxContainer } from "../interfaces/proxmox-lxc.interface.js";
import { IProxmoxVM } from "../interfaces/proxmox-vm.interface.js";
import { getServiceRedirectUrl } from "./service-redirects.mapper.js";
import { bytesToMB } from "../helper/formatBytes.js";

export enum MachineType {
  VM = "vm",
  Container = "container",
}

/**
 * Retorna a VM ou Container formatado para o padrão do dashboard.
 * @param machine
 * @param machineType
 * @returns
 */
export function proxmoxServiceMapper(
  machine: IProxmoxVM | IProxmoxContainer,
  machineType: MachineType,
): IDashboardService {
  return {
    id: machine.vmid,
    name: machine.name,
    type: machineType,
    status: machine.status,
    cpu: Number((machine.cpu * 100).toFixed(1)),
    memory: bytesToMB(machine.mem),
    uptime: machine.uptime,
    redirectUrl: getServiceRedirectUrl(machine.name),
  };
}
