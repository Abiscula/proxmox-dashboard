export type ServiceType = "vm" | "container";

export type ServiceStatus = "running" | "stopped";

export interface IService {
  id: number;
  name: string;
  type: ServiceType;
  status: ServiceStatus;
  cpu: number;
  memory: number;
  uptime: number;
}
