type ServiceType = "vm" | "container";

export interface IDashboardService {
  id: number;
  name: string;
  type: ServiceType;
  status: "running" | "stopped";
  cpu: number;
  memory: number;
  memoryUsage: number;
  uptime: number;
}

export type IDashboardResponse =
  | { services: IDashboardService[] }
  | { error: string };
