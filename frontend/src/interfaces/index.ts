export type ServiceType = "vm" | "container";

export type ServiceStatus = "running" | "stopped";

export interface IService {
  id: number;
  name: string;
  type: ServiceType;
  status: ServiceStatus;
  cpu: number;
  memory: number;
  totalMemory?: number;
  uptime: number;
  redirectUrl?: string | null;
  diskUsage: number;
  diskUsed: number;
  diskTotal: number;
}

export interface IOverviewData {
  cpuUsage: number;
  memoryUsage: number;
  memoryTotal: string;
  memoryUsed: string;
  storageUsage: number;
  storageTotal: string;
  storageUsed: string;
  uptime: number;
}

export interface IStateEvent {
  overview: IOverviewData;
  dashboard: {
    services: IService[];
  };
}

export interface IServiceStatus {
  id: string;
  url: string;
  online: boolean;
}

export interface IDockerContainer {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
}

export type CardVariant = "default" | "docker";
