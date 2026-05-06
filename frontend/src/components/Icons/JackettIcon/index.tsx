import JackettSvg from "../../../assets/icons/jackett-icon.svg?react";
type Props = {
  size?: number;
};

export default function JackettIcon({ size = 24 }: Props) {
  return <JackettSvg width={size} height={size} />;
}
