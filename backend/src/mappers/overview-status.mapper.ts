import { formatBytes } from "../helper/formatBytes.js";
import { INodeOverview } from "../interfaces/overview.interface.js";
import { IProxmoxNodeStatus } from "../interfaces/proxmox-status.interface.js";
import { IProxmoxStorage } from "../interfaces/proxmox-storage.interface.js";

// Mapeia informações de CPU, memória e uptime do node
function mapCpuAndMemory(status: IProxmoxNodeStatus) {
  return {
    cpuUsage: Number((status.cpu * 100).toFixed(1)),

    memoryUsage: Number(
      ((status.memory.used / status.memory.total) * 100).toFixed(2),
    ),

    memoryTotal: formatBytes(status.memory.total),
    memoryUsed: formatBytes(status.memory.used),

    uptime: status.uptime, // NÃO mexe
  };
}

// Agrega e calcula informações de armazenamento do node
function mapStorage(storageInfos: IProxmoxStorage[]) {
  const totalStorage = storageInfos.reduce(
    (acc, storage) => acc + storage.total,
    0,
  );

  const usedStorage = storageInfos.reduce(
    (acc, storage) => acc + storage.used,
    0,
  );

  const storageUsage = totalStorage
    ? Number(((usedStorage / totalStorage) * 100).toFixed(2))
    : 0;

  return {
    storageTotal: formatBytes(totalStorage),
    storageUsed: formatBytes(usedStorage),
    storageUsage,
  };
}

// Consolida status e storage em um overview
export function overviewStatusMapper(
  status: IProxmoxNodeStatus,
  storage: IProxmoxStorage[],
): INodeOverview {
  return {
    // Dados de CPU, memória e uptime
    ...mapCpuAndMemory(status),

    // Dados agregados de armazenamento
    ...mapStorage(storage),
  };
}
