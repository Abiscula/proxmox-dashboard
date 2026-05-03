import { INodeOverview } from "../interfaces/overview.interface.js";
import { IProxmoxNodeStatus } from "../interfaces/proxmox-status.interface.js";
import { IProxmoxStorage } from "../interfaces/proxmox-storage.interface.js";

// Mapeia informações de CPU, memória e uptime do node
function mapCpuAndMemory(status: IProxmoxNodeStatus) {
  return {
    // Uso total de CPU do host (convertido para %)
    cpuUsage: Number((status.cpu * 100).toFixed(1)),

    // Percentual de memória utilizada
    memoryUsage: Number(
      ((status.memory.used / status.memory.total) * 100).toFixed(2),
    ),

    // Memória total do host (em bytes)
    memoryTotal: status.memory.total,

    // Memória utilizada (em bytes)
    memoryUsed: status.memory.used,

    // Tempo de atividade do host (em segundos)
    uptime: status.uptime,
  };
}

// Agrega e calcula informações de armazenamento do node
function mapStorage(storageInfos: IProxmoxStorage[]) {
  // Soma total de todos os storages disponíveis
  const totalStorage = storageInfos.reduce(
    (acc, storage) => acc + storage.total,
    0,
  );

  // Soma total de espaço utilizado
  const usedStorage = storageInfos.reduce(
    (acc, storage) => acc + storage.used,
    0,
  );

  // Calcula percentual de uso do armazenamento
  const storageUsage = totalStorage
    ? Number(((usedStorage / totalStorage) * 100).toFixed(2))
    : 0;

  return {
    // Armazenamento total (em bytes)
    storageTotal: totalStorage,

    // Armazenamento utilizado (em bytes)
    storageUsed: usedStorage,

    // Percentual de uso do armazenamento
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
