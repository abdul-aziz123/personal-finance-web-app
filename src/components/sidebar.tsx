import React from "react";
import { IconCaretRight, IconMinimize, IconLogoLarge } from "@/icons";
import { cn } from "@/libs/utils";

type SidebarItemProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "Menu" | "Minimize";
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SidebarItem({
  children,
  variant = "Minimize",
  active,
  className,
  ...props
}: SidebarItemProps) {
  return (
    <button
      className={cn(
        "group flex h-14 w-[276px] flex-row items-center gap-space200 rounded-br-xl rounded-tr-xl bg-Grey900 px-space400 py-space200 text-text3 font-bold text-Grey300 hover:text-Grey100",
        {
          "active:border-l-4 active:border-l-Green active:bg-Beige100 active:text-Grey900":
            variant == "Menu",
        },
        className,
      )}
    >
      {variant == "Minimize" && (
        <IconMinimize className="fill-Grey500 group-hover:fill-Grey100" />
      )}
      {variant == "Menu" && (
        <IconCaretRight className="fill-Grey500 group-hover:fill-Grey100 group-active:fill-Green" />
      )}
      {children}
    </button>
  );
}

export default function SidebarFull() {
  return (
    <div className="flex min-h-screen max-w-72 flex-col gap-space300 rounded-br-2xl rounded-tr-2xl bg-Grey900 py-space300">
      <IconLogoLarge className="px-space400 py-space500" />
      <div className="max-h-[800px] w-[300px] flex-col gap-space50 pr-space300">
        <SidebarItem variant="Menu">Placeholder</SidebarItem>
        <SidebarItem variant="Menu">Placeholder</SidebarItem>
      </div>
      <SidebarItem variant="Minimize">Placeholder</SidebarItem>
    </div>
  );
}

// export default Sidebar;
