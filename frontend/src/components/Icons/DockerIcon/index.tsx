import DockerSvg from "../../../assets/icons/docker-icon.svg?react";
type Props = {
  size?: number;
};

export default function DockerIcon({ size = 24 }: Props) {
  return <DockerSvg width={size} height={size} />;
}
