import type { IService } from "../interfaces";

export function orderServices(serviceList: IService[]): IService[] {
  return [...serviceList].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "running" ? -1 : 1;
    }

    return a.id - b.id;
  });
}
