import React from "react";
import { List } from "lucide-react";

type TabProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Tab({ children, ...props }: TabProps) {
  return (
    <button
      className="group flex flex-row gap-space100 bg-white p-space250 text-text4_bold font-bold text-Grey500 hover:border-b-4 hover:border-b-Grey900 hover:text-Grey900 active:bg-Grey900 active:text-white"
      {...props}
    >
      <List className="size-4 fill-Grey500 group-hover:font-bold group-hover:text-Grey900 group-active:font-bold group-active:text-white" />
      {children}
    </button>
  );
}
