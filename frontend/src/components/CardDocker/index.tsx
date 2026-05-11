import type { IDockerContainer } from "../../interfaces";
import DockerIcon from "../Icons/DockerIcon";

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
        <DockerIcon size={32} />
        <Status status={container.state === "running" ? "running" : "stopped"}>
          {container.state}
        </Status>
      </CardHeader>

      <CardTitle>{container.name}</CardTitle>

      <CardBody>
        <Metric>ID: {container.id.slice(0, 12)}</Metric>
        <Metric>Image: {container.image}</Metric>
        <Metric>Uptime: {container.status}</Metric>
      </CardBody>
    </CardContainer>
  );
}
