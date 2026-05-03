export interface IServiceType {
  vm: "vm";
  container: "container";
}

export interface IServiceStatus {
  running: "running";
  stopped: "stopped";
}

export interface IService {
  id: number;
  name: string;
  type: IServiceType;
  status: "running" | "stopped";
  cpu: number;
  memory: number;
  uptime: number;
}
