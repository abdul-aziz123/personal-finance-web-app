import React from "react";

type FormFieldProps = {
  label: string;
  placeholder: string;
  helperText: string;
  className?: string;
  type?: string;
  IconComponent?: React.ReactNode;
};

export default function FormField({
  label,
  placeholder,
  helperText,
  type,
  IconComponent,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-space50">
      <label className="text-text5_bold font-bold leading-[18px] text-Grey500">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="min-h-[45px] min-w-80 rounded-lg border border-Beige500 px-space250 py-space150 text-Grey900 placeholder:text-Beige500 hover:border-Grey500 hover:placeholder:text-Grey900 active:border-Grey900 active:placeholder:text-Grey900"
        />
        {IconComponent && (
          <span className="absolute right-5 top-[35%]">{IconComponent}</span>
        )}
      </div>
      {helperText && (
        <span className="self-end text-text5 text-Grey500">{helperText}</span>
      )}
    </div>
  );
}

// Usage

{
  /* <FormField
        label="Basic Field"
        placeholder="Placeholder"
        helperText="Helper text"
        IconComponent={
          <span className="fill-Grey500 hover:fill-Grey900 active:fill-Grey900">
            <IconCaretRight className="fill-current" />
          </span>
        }
      /> */
}
