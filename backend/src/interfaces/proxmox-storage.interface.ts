export interface IProxmoxStorage {
  storage: string;
  type: string;
  content: string;

  total: number;
  used: number;
  avail: number;
  used_fraction: number;

  enabled: number;
  active: number;
  shared: number;
}
