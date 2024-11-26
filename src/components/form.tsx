import React from "react";

type FormFieldProps = {
  id?: string;
  label?: string;
  placeholder: string;
  helperText?: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormField({
  id,
  label,
  placeholder,
  helperText,
  type = "text",
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>
      {helperText && (
        <span className="text-sm text-gray-500">{helperText}</span>
      )}
    </div>
  );
}
