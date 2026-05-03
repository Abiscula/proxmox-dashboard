export interface IProxmoxNodeStatus {
  memory: {
    total: number;
    used: number;
    free: number;
    available: number;
  };

  swap: {
    total: number;
    used: number;
    free: number;
  };

  loadavg: [string, string, string];

  cpu: number;
  idle: number;
  wait: number;

  uptime: number;

  rootfs: {
    total: number;
    used: number;
    free: number;
    avail: number;
  };

  cpuinfo: {
    cpus: number;
    cores: number;
    sockets: number;
    mhz: string;
    model: string;
    vendor: string;
    flags: string;
    family: string;
    user_hz: number;
    hvm: string;
  };

  pveversion: string;
  kversion: string;

  "current-kernel": {
    release: string;
    version: string;
    sysname: string;
    machine: string;
  };

  "boot-info": {
    mode: string;
    secureboot: number;
  };

  ksm: {
    shared: number;
  };
}

export interface INodeOverview {
  cpuUsage: number;
  memoryUsage: number;
  memoryTotal: number;
  memoryUsed: number;
  uptime: number;
}
