import { useEffect, useState, type JSX } from "react";

import JackettIcon from "../Icons/JackettIcon";
import UptimeIcon from "../Icons/KumaIcon";
import TailscaleIcon from "../Icons/TailscaleIcon";

import {
  Container,
  ServiceButton,
  ServicesContainer,
  StatusIndicator,
} from "./styles";

import { getServicesStatus } from "../../services/api";
import type { IServiceStatus } from "../../interfaces";

const serviceIcons: Record<string, JSX.Element> = {
  uptime: <UptimeIcon size={34} />,
  jackett: <JackettIcon size={30} />,
  tailscale: <TailscaleIcon size={32} />,
};

export default function QuickAccessBar() {
  const [services, setServices] = useState<IServiceStatus[]>([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getServicesStatus();
        setServices(data);
      } catch (err) {
        console.error("Erro ao buscar status dos serviços:", err);
      }
    }

    fetchServices();

    const interval = setInterval(fetchServices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <ServicesContainer>
        {services.map((service) => (
          <ServiceButton
            key={service.id}
            href={service.url}
            target="_blank"
            rel="noreferrer"
          >
            {serviceIcons[service.id]}

            <StatusIndicator $isOnline={service.online} />
          </ServiceButton>
        ))}
      </ServicesContainer>
    </Container>
  );
}
