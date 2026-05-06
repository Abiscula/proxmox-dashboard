import TailscaleSvg from "../../../assets/icons/tailscale-icon.svg?react";
type Props = {
  size?: number;
};

export default function TailscaleIcon({ size = 24 }: Props) {
  return <TailscaleSvg width={size} height={size} />;
}
