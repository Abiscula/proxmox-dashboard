import Docker from "dockerode";
import { ContainerInfo } from "dockerode";
import { IDockerContainer } from "../interfaces/docker-container.interface";
import { formatDockerUptime } from "../helpers/format-docker-uptime";

const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

export class DockerService {
  static async getContainers(): Promise<IDockerContainer[]> {
    const containers: ContainerInfo[] = await docker.listContainers({
      all: true,
    });

    return containers.map((container: ContainerInfo) => ({
      id: container.Id,
      name: container.Names?.[0]?.replace("/", "") || "unknown",
      image: container.Image,
      state: container.State,
      status: formatDockerUptime(container.Status),
    }));
  }
}
