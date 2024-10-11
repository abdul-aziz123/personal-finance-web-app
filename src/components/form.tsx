import React from "react";
import { IconSearch } from "@/icons";

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
  className,
  type,
  IconComponent,
  ...props
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-space50`}>
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
