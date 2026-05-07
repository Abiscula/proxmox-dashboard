import { MachineType } from "../constants/proxmox.js";
import { IProxmoxContainer } from "../interfaces/proxmox-lxc.interface.js";
import { IProxmoxVM } from "../interfaces/proxmox-vm.interface.js";

type DiskUsage = {
  diskUsed: number;
  diskTotal: number;
  diskUsage: number;
};

type VMFileSystemInfo = {
  result: {
    mountpoint: string;
    "used-bytes": number;
    "total-bytes": number;
  }[];
};

/**
 * Calcula o uso de disco de VMs e Containers.
 *
 * Para VMs, utiliza os dados retornados pelo QEMU Guest Agent.
 * Para Containers, utiliza os dados nativos da API do Proxmox.
 */
export function getDiskUsage(
  machine: IProxmoxVM | IProxmoxContainer,
  machineType: MachineType,
  fsInfo?: VMFileSystemInfo,
): DiskUsage {
  const rootFileSystem = fsInfo?.result?.find(
    (item: VMFileSystemInfo["result"][number]) => item.mountpoint === "/",
  );

  const diskUsed =
    machineType === MachineType.VM
      ? (rootFileSystem?.["used-bytes"] ?? 0)
      : machine.disk;

  const diskTotal =
    machineType === MachineType.VM
      ? (rootFileSystem?.["total-bytes"] ?? 0)
      : machine.maxdisk;

  const diskUsage =
    diskTotal > 0 ? Number(((diskUsed / diskTotal) * 100).toFixed(1)) : 0;

  return {
    diskUsed,
    diskTotal,
    diskUsage,
  };
}
