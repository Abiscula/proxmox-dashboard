import type { IDockerContainer } from "../../interfaces";

import {
  CardContainer,
  CardHeader,
  CardTitle,
  Status,
  CardBody,
  Metric,
} from "./styles";

type Props = {
  container: IDockerContainer;
};

export default function CardDocker({ container }: Props) {
  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{container.name}</CardTitle>

        <Status status={container.state === "running" ? "running" : "stopped"}>
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
