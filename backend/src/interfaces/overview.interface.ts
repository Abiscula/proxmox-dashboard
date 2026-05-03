export interface INodeOverview {
  cpuUsage: number;

  memoryUsage: number;
  memoryTotal: string;
  memoryUsed: string;

  storageUsage: number;
  storageTotal: string;
  storageUsed: string;

  uptime: number;
}
