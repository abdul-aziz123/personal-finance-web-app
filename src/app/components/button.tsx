import React from "react";
import { cn } from "../libs/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "destroy";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        " ",
        {
          "rounded-lg bg-Grey900 p-space200 text-text4_bold text-white hover:bg-Grey500":
            variant == "primary",
          "rounded-lg bg-Beige100 p-space200 text-text4_bold text-Grey900 hover:border hover:border-Beige500 hover:bg-white":
            variant == "secondary",
          "rounded-lg bg-Red p-space200 text-text4_bold text-white hover:bg-opacity-80":
            variant == "destroy",
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
