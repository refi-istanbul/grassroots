import { ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export enum ButtonIcon {
  Redeem = "redeem",
  Withdraw = "withdraw",
}

export interface IconProps {
  icon: ButtonIcon;
  className: string;
}

const getIconByName = (props: IconProps) => {
  switch (props.icon) {
    case ButtonIcon.Redeem:
      return <ArrowUpTrayIcon className={props.className} />;
    case ButtonIcon.Withdraw:
      return <ArrowDownTrayIcon className={props.className} />;
    default:
      break;
  }
};

const Icon = (props: IconProps) => {
  return getIconByName(props);
};

export default Icon;
