"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconNavOverview,
  IconNavTransactions,
  IconNavBudgets,
  IconNavPots,
  IconNavReccurringBills,
  IconLogoLarge,
  IconLogoSmall,
} from "@/icons";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { cn } from "@/libs/utils";

type SidebarItemProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: "Menu" | "Minimize";
  IconComponent: React.ReactElement;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SidebarItem = ({
  variant,
  IconComponent,
  className,
  children,
  onClick,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  const content = (
    <div
      className={cn(
        "group flex h-14 min-w-[80px] max-w-[276px] flex-row items-center gap-space200 rounded-br-xl rounded-tr-xl bg-Grey900 px-space400 py-space200 text-text3 font-bold text-Grey300 hover:text-Grey100",
        {
          // "active:w-[92%] active:border-l-4 active:border-l-Green active:bg-Beige100 active:px-7 active:text-Grey900":
          //   variant === "Menu",
          "w-[92%] border-l-4 border-l-Green bg-Beige100 px-7 text-Grey900 hover:text-Grey900":
            isActive,
        },
        className,
      )}
    >
      {React.cloneElement(IconComponent, {
        className: cn(IconComponent.props.className, {
          "fill-Green": isActive,
          "group-hover:fill-Grey100": !isActive,
        }),
      })}
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return <button onClick={onClick}>{content}</button>;
};

export default function ToggleableSidebar() {
  const [isMaximized, setIsMaximized] = useState(true);

  const toggleSidebar = () => {
    setIsMaximized((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col gap-space300 rounded-br-2xl rounded-tr-2xl bg-Grey900 pb-space300 transition-all duration-300 ${
        isMaximized ? "min-h-screen w-[300px]" : "h-screen w-[88px]"
      }`}
    >
      <div className="px-space400 py-space500">
        {isMaximized ? (
          <IconLogoLarge className="h-auto w-full" />
        ) : (
          <IconLogoSmall className="h-auto w-full" />
        )}
      </div>
      <div
        className={`flex-col gap-space50 ${isMaximized ? "pr-space300" : "pr-space100"}`}
      >
        <SidebarItem
          variant="Menu"
          IconComponent={<IconNavOverview />}
          href="/"
        >
          {isMaximized && "Overview"}
        </SidebarItem>
        <SidebarItem
          variant="Menu"
          IconComponent={<IconNavTransactions />}
          href="/transactions"
        >
          {isMaximized && "Transactions"}
        </SidebarItem>
        <SidebarItem
          variant="Menu"
          IconComponent={<IconNavBudgets />}
          href="/budgets"
        >
          {isMaximized && "Budgets"}
        </SidebarItem>
        <SidebarItem
          variant="Menu"
          IconComponent={<IconNavPots />}
          href="/pots"
        >
          {isMaximized && "Pots"}
        </SidebarItem>
        <SidebarItem
          variant="Menu"
          IconComponent={<IconNavReccurringBills />}
          href="/recurring-bills"
        >
          {isMaximized && "Recurring bills"}
        </SidebarItem>
      </div>
      <div className="mt-auto pt-7">
        <SidebarItem
          IconComponent={
            isMaximized ? (
              <ArrowBigLeftDash className="size-6 fill-Grey500 group-hover:fill-Grey100" />
            ) : (
              <ArrowBigRightDash className="size-6 fill-Grey500 group-hover:fill-Grey100" />
            )
          }
          onClick={toggleSidebar}
        >
          {isMaximized && "Minimize"}
        </SidebarItem>
      </div>
    </div>
  );
}
