import { formatServiceType } from "../../formatter/formatServiceType";
import { formatUptime } from "../../formatter/formatUptime";

import type { IService, IDockerContainer, CardVariant } from "../../interfaces";

import {
  CardContainer,
  CardHeader,
  CardTitle,
  Status,
  CardBody,
  Metric,
  DiskContainer,
  DiskBar,
  DiskBarFill,
  DiskInfo,
  ActionsContainer,
  AccessButton,
} from "./styles";

type Props = {
  service?: IService;
  container?: IDockerContainer;
  variant?: CardVariant;
};

export default function Card({
  service,
  container,
  variant = "default",
}: Props) {
  const handleRedirect = () => {
    if (!service?.redirectUrl) return;

    window.open(service.redirectUrl, "_blank");
  };

  if (variant === "docker" && container) {
    return (
      <CardContainer variant="docker">
        <CardHeader>
          <CardTitle>{container.name}</CardTitle>
          <Status
            status={container.state === "running" ? "running" : "stopped"}
          >
            {container.state}
          </Status>
        </CardHeader>

        <CardBody>
          <Metric>ID: {container.id.slice(0, 12)}</Metric>
          <Metric>Image: {container.image}</Metric>
          <Metric>Uptime: {container.status}</Metric>
        </CardBody>
      </CardContainer>
    );
  }

  if (!service) return null;

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>

        <Status status={service.status}>{service.status}</Status>
      </CardHeader>

      <CardBody>
        <Metric>ID: {service.id}</Metric>
        <Metric>Tipo: {formatServiceType(service.type)}</Metric>
        <Metric>CPU: {service.cpu}%</Metric>
        <Metric>Memória RAM: {service.memory} MB</Metric>
        <Metric>Uptime: {formatUptime(service.uptime)}</Metric>

        <DiskContainer>
          <DiskInfo>
            <Metric>Disco: {service.diskUsage}%</Metric>

            <Metric>
              {Math.round(service.diskUsed / 1024 / 1024 / 1024)}GB /
              {Math.round(service.diskTotal / 1024 / 1024 / 1024)}GB
            </Metric>
          </DiskInfo>

          <DiskBar>
            <DiskBarFill usage={service.diskUsage} />
          </DiskBar>
        </DiskContainer>

        {service.redirectUrl && (
          <ActionsContainer>
            <AccessButton onClick={handleRedirect}>Acessar</AccessButton>
          </ActionsContainer>
        )}
      </CardBody>
    </CardContainer>
  );
}
