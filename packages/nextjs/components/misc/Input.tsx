import { classNames } from "~~/utils/ui/cssUtils";

export interface ClassesProps {
  width?: string;
  height?: string;
  padding?: string;
  borderColor?: string;
  textColor?: string;
  textSize?: string;
  hover?: string;
}

export interface InputProps {
  full?: boolean;
  classes: ClassesProps;
  content?: any;
  setContent?: any;
  placeholder?: any;
  type: string;
  label?: string;
  readOnly?: boolean;
  cssSpecialId?: string;
}

export const Input = ({
  full,
  content,
  setContent,
  placeholder,
  type,
  label,
  readOnly,
  cssSpecialId,
  classes: classesProps,
}: InputProps) => {
  const _inputClasses = {
    padding: classesProps?.padding ? `p-${classesProps?.padding}` : "",
    borderColor: classesProps?.borderColor
      ? `border-2 border-${classesProps?.borderColor} active:border-${classesProps?.borderColor} focus:outline-${classesProps?.borderColor}`
      : "", // TODO: Focus border not applying
    width: classesProps?.width ? `!w-${classesProps?.width}` : "",
    textColor: classesProps?.textColor ? `text-${classesProps?.textColor}` : "",
    textSize: classesProps?.textColor ? `text-${classesProps?.textSize}` : "",
    hover: classesProps?.hover ? classesProps.hover : "",
  } as ClassesProps;

  // Note: 'bg-primary' is the because Tailwind sometimes bugs out and doesn't take in the passed dynamic value
  const inputClassesJoined = classNames(
    "w-full rounded-lg gap", // bg-primary
    ...Object.values(_inputClasses),
  );

  // const _wrapperClasses = {
  //   width: classesProps?.width ? `!w-${classesProps?.width}` : "",
  //   height: classesProps?.height ? `h-${classesProps?.height}` : "",
  // };

  let size = "";

  if (full) {
    size = "!w-full !h-full";
  } else {
    size = "!w-3/4 !h-3/4";
  }

  const wrapperClassesJoined = classNames(
    `flex flex-col justify-center gap-1 ${size}`, // bg-primary
  );

  return (
    <div className={wrapperClassesJoined} id={`${cssSpecialId ? `${cssSpecialId}` : ""}`}>
      {label && <label className="text-neutral font-bold ml-2">{label}</label>}
      <input
        readOnly={readOnly}
        className={inputClassesJoined}
        value={content}
        step={type === "number" ? "0.01" : ""}
        min={type === "number" ? 0 : ""}
        onChange={setContent ? e => setContent(e.target.value) : undefined}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};
