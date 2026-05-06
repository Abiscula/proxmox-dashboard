import UptimeIcon from "../Icons/KumaIcon";
import { Container, Header, ServiceButton, ServicesContainer } from "./styles";

const services = [
  {
    url: "http://monitor.home:3001/dashboard",
    icon: <UptimeIcon size={36} />,
  },
  {
    url: "http://192.168.0.10:9117",
    icon: "",
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
