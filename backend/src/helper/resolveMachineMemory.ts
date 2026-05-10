import { MachineType } from "../constants/proxmox.js";
import { bytesToMB } from "./formatBytes.js";
import { getMemoryInfo } from "../services/agent/agent.service.js";

const DOCKER_VM_ID = 101;

type ResolveMachineMemoryParams = {
  vmid: number;
  machineType: MachineType;
  usedMemoryBytes: number;
  totalMemoryBytes: number;
};

type ResolveMachineMemoryResult = {
  memory: number;
  totalMemory?: number;
};

export async function resolveMachineMemory({
  vmid,
  machineType,
  usedMemoryBytes,
  totalMemoryBytes,
}: ResolveMachineMemoryParams): Promise<ResolveMachineMemoryResult> {
  /**
   * LXC:
   * usa memória real do Proxmox
   */
  if (machineType === "container") {
    return {
      memory: bytesToMB(usedMemoryBytes),
      totalMemory: bytesToMB(totalMemoryBytes),
    };
  }

  /**
   * VM Docker:
   * usa memória real do agent (so serve para este caso)
   */
  if (vmid === DOCKER_VM_ID) {
    const memoryInfo = await getMemoryInfo();

    return {
      memory: memoryInfo.usedMemoryMB,
      totalMemory: memoryInfo.totalMemoryMB,
    };
  }

  /**
   * VM comum:
   * mantém comportamento atual
   */
  return {
    memory: bytesToMB(usedMemoryBytes),
  };
}
