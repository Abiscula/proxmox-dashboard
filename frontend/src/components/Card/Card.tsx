import { formatServiceType } from "../../formatter/formatServiceType";
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
        <Metric>Tipo: {formatServiceType(service.type)}</Metric>
        <Metric>CPU: {(service.cpu * 100).toFixed(1)}%</Metric>
        <Metric>Memória RAM: {service.memory} MB</Metric>
        <Metric>Uptime: {Math.floor(service.uptime / 60)} min</Metric>
      </CardBody>
    </CardContainer>
  );
}