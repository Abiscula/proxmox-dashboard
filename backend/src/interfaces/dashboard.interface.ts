type ServiceType = "vm" | "container";

export interface IDashboardService {
  id: number;
  name: string;
  type: ServiceType;
  status: "running" | "stopped";
  cpu: number;
  memory: number;
  uptime: number;
  redirectUrl?: string | null;
}

export type IDashboardResponse =
  | { services: IDashboardService[] }
  | { error: string };
