export interface IDockerContainer {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
}

export interface IMemoryInfo {
  totalMemoryMB: number;
  usedMemoryMB: number;
}
