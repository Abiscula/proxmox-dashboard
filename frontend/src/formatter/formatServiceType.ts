import type { ServiceType } from "../interfaces";

export function formatServiceType(type: ServiceType): string {
  switch (type) {
    case "vm":
      return "Máquina Virtual (VM)";
    case "container":
      return "Container (CT)";
    default:
      return type;
  }
}
