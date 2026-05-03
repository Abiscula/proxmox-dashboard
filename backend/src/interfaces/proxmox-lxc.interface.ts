export interface IProxmoxContainer {
  vmid: number;
  name: string;
  type: "lxc";
  status: "running" | "stopped";

  cpu: number;
  cpus: number;

  mem: number;
  maxmem: number;

  swap: number;
  maxswap: number;

  disk: number;
  maxdisk: number;
  diskread: number;
  diskwrite: number;

  netin: number;
  netout: number;

  uptime: number;

  pid?: number;

  pressurecpufull?: string;
  pressurecpusome?: string;

  pressureiofull?: string;
  pressureiosome?: string;

  pressurememoryfull?: string;
  pressurememorysome?: string;
}
