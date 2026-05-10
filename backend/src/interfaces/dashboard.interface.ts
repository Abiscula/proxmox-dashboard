type ServiceType = "vm" | "container";

export interface IDashboardService {
  id: number;
  name: string;
  type: ServiceType;
  status: "running" | "stopped";
  cpu: number;
  memory: number;
  totalMemory?: number;
  uptime: number;
  redirectUrl?: string | null;
  diskUsage: number;
  diskUsed: number;
  diskTotal: number;
}

export type IDashboardResponse =
  | { services: IDashboardService[] }
  | { error: string };
