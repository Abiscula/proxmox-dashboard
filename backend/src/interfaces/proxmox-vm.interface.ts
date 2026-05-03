export interface IProxmoxVM {
  vmid: number;
  name: string;
  status: "running" | "stopped";
  cpu: number;
  cpus: number;
  mem: number;
  maxmem: number;
  disk: number;
  maxdisk: number;
  uptime: number;

  netin: number;
  netout: number;

  // opcionais (só quando rodando)
  pid?: number;
  memhost?: number;

  pressureiofull?: number;
  pressureiosome?: number;

  pressurememoryfull?: number;
  pressurememorysome?: number;

  pressurecpufull?: number;
  pressurecpusome?: number;
}
