import JackettIcon from "../Icons/JackettIcon";
import UptimeIcon from "../Icons/KumaIcon";
import TailscaleIcon from "../Icons/TailscaleIcon";
import { Container, Header, ServiceButton, ServicesContainer } from "./styles";

const services = [
  {
    url: "http://monitor.home:3001/dashboard",
    icon: <UptimeIcon size={34} />,
  },
  {
    url: "http://monitor.home:9117/UI/Dashboard",
    icon: <JackettIcon size={30} />,
  },
  {
    url: "https://login.tailscale.com/admin",
    icon: <TailscaleIcon size={32} />,
  },
];

export default function QuickAccessBar() {
  return (
    <Container>
      <Header>Services:</Header>

      <ServicesContainer>
        {services.map((service, index) => (
          <ServiceButton
            key={index}
            href={service.url}
            target="_blank"
            rel="noreferrer"
          >
            {service.icon}
          </ServiceButton>
        ))}
      </ServicesContainer>
    </Container>
  );
}
