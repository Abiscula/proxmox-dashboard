import { formatServiceType } from "../../formatter/formatServiceType";
import { formatUptime } from "../../formatter/formatUptime";
import type { IService } from "../../interfaces";
import {
  CardContainer,
  CardHeader,
  CardTitle,
  Status,
  CardBody,
  Metric,
} from "./styles";

type Props = {
  service: IService;
};

export default function Card({ service }: Props) {
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
      </CardBody>
    </CardContainer>
  );
}