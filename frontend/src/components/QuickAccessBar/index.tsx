import JackettIcon from "../Icons/JackettIcon";
import UptimeIcon from "../Icons/KumaIcon";
import { Container, Header, ServiceButton, ServicesContainer } from "./styles";

const services = [
  {
    url: "http://monitor.home:3001/dashboard",
    icon: <UptimeIcon size={36} />,
  },
  {
    url: "http://monitor.home:9117/UI/Dashboard",
    icon: <JackettIcon size={30} />,
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
