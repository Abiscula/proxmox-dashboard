import UptimeSvg from "../../../assets/icons/uptime-kuma.svg?react";
type Props = {
  size?: number;
};

export default function UptimeIcon({ size = 24 }: Props) {
  return <UptimeSvg width={size} height={size} />;
}
