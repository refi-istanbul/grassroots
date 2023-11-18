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

export interface TextAreaProps {
  full?: boolean;
  classes: ClassesProps;
  content: any;
  setContent?: any;
  placeholder?: any;
  label?: string;
  rows: number;
  readOnly?: boolean;
}

export const TextArea = ({
  full,
  content,
  setContent,
  placeholder,
  label,
  rows,
  readOnly,
  classes: classes,
}: TextAreaProps) => {
  const _textAreaClasses = {
    padding: classes?.padding ? `p-${classes?.padding}` : "",
    borderColor: classes?.borderColor
      ? `border-2 border-${classes?.borderColor} active:border-${classes?.borderColor} focus:outline-${classes?.borderColor}`
      : "", // TODO: Focus border not applying
    textColor: classes?.textColor ? `text-${classes?.textColor}` : "",
    textSize: classes?.textColor ? `text-${classes?.textSize}` : "",
    hover: classes?.hover ? classes.hover : "",
  } as ClassesProps;

  // Note: 'bg-primary' is the because Tailwind sometimes bugs out and doesn't take in the passed dynamic value
  const textAreaClassesJoined = classNames(
    "w-full rounded-lg gap", // bg-primary
    ...Object.values(_textAreaClasses),
  );

  let size = "";
  if (full) {
    size = "!w-full !h-full";
  } else {
    size = "!w-3/4 !h-3/4";
  }

  const wrapperClassesJoined = classNames(
    `flex flex-col gap-1 ${size}`, // bg-primary
  );

  return (
    <div className={wrapperClassesJoined}>
      {label && <label className="text-neutral font-bold">{label}</label>}
      <textarea
        readOnly={readOnly}
        rows={rows || 10}
        className={textAreaClassesJoined}
        value={content}
        onChange={setContent ? e => setContent(e.target.value) : undefined}
        placeholder={placeholder}
      />
    </div>
  );
};
