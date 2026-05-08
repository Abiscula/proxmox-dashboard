import { IDockerContainer } from "../../interfaces/agent/docker-container.interface.js";

export async function getContainers(): Promise<IDockerContainer[]> {
  const response = await fetch(`${process.env.AGENT_URL}/docker/containers`);

  if (!response.ok) {
    throw new Error("Failed to fetch containers");
  }

  return response.json();
}
