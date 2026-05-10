import {
  IDockerContainer,
  IMemoryInfo,
} from "../../interfaces/agent/agent.interface.js";

export async function getContainers(): Promise<IDockerContainer[]> {
  const response = await fetch(`${process.env.AGENT_URL}/docker/containers`);

  if (!response.ok) {
    throw new Error("Falha ao buscar os containers Docker");
  }

  return response.json();
}

export async function getMemoryInfo(): Promise<IMemoryInfo> {
  const response = await fetch(`${process.env.AGENT_URL}/system/memory`);

  if (!response.ok) {
    throw new Error("Falha ao buscar informações de memória");
  }

  return response.json();
}
