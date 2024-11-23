import React from "react";
import { cn } from "@/libs/utils";
import { IconCaretRight } from "@/icons";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "destroy" | "page";
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
          "group flex flex-row items-center justify-center gap-space150 text-text4 text-Grey500 hover:text-Grey900":
            variant == "tertiary",
          "group flex flex-row items-center justify-center gap-space200 rounded-lg border-[1px] border-Beige500 bg-white px-space200 py-space100 text-text4 font-normal text-Grey900 hover:bg-Beige500 hover:text-white":
            variant == "page",
        },
        className,
        { ...props },
      )}
    >
      {children}
      {variant == "tertiary" && (
        <IconCaretRight className="fill-Grey500 group-hover:fill-Grey900" />
      )}
    </button>
  );
}
