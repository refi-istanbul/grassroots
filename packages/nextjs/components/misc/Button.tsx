import { useEffect, useState } from "react";
import Icon, { ButtonIcon } from "./Icon";
import { classNames } from "~~/utils/ui/cssUtils";

export interface ButtonProps {
  classes?: ClassesProps;
  icon?: ButtonIcon;
  text: string;
  onClick: any;
}

export interface ClassesProps {
  width?: string;
  height?: string;
  padding?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
  fontWeight?: string;
  iconSize?: string;
  hover?: string;
}

export const Button = ({ text, onClick, icon, classes: classesProps }: ButtonProps) => {
  const [buttonClasses, setButtonClasses] = useState("");
  const [iconClasses, setIconClasses] = useState("");

  useEffect(() => {
    const _buttonClasses = {
      width: classesProps?.width ? `w-${classesProps?.width}` : "",
      height: classesProps?.height ? `h-${classesProps?.height}` : "",
      padding: classesProps?.padding ? `p-${classesProps?.padding}` : "",
      borderColor: classesProps?.borderColor,
      bgColor: classesProps?.bgColor ? classesProps?.bgColor : "bg-primary",
      textColor: classesProps?.textColor ? `text-${classesProps?.textColor}` : "",
      textSize: classesProps?.textColor ? `text-${classesProps?.textSize}` : "",
      fontWeight: classesProps?.textColor ? `font-${classesProps?.fontWeight}` : "",
      hover: classesProps?.hover ? classesProps.hover : "",
    } as ClassesProps;

    // Note: 'bg-primary' is the because Tailwind sometimes bugs out and doesn't take in the passed dynamic value
    const buttonClassesJoined = classNames(
      "flex flex-row justify-center items-center rounded-lg gap-2", // bg-primary
      ...Object.values(_buttonClasses),
    );

    const _iconClasses = {
      size: classesProps?.iconSize ? `w-${classesProps.iconSize} h-${classesProps.iconSize}` : "",
    };

    const iconClassesJoined = classNames("inline-block", ...Object.values(_iconClasses));

    setButtonClasses(buttonClassesJoined);
    setIconClasses(iconClassesJoined);
  }, [classesProps]);

  return (
    <button onClick={onClick} className={buttonClasses}>
      {text}
      {icon && <Icon icon={icon} className={iconClasses} />}
    </button>
  );
};
