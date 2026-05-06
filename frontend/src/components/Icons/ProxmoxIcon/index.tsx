import ProxmoxSvg from "../../../assets/icons/proxmox-icon.svg?react";
type Props = {
  size?: number;
};

export default function ProxmoxIcon({ size = 24 }: Props) {
  return <ProxmoxSvg width={size} height={size} />;
}
