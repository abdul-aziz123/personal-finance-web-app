"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconNavOverview,
  IconNavTransactions,
  IconNavBudgets,
  IconNavPots,
  IconNavReccurringBills,
} from "@/icons";
import { cn } from "@/libs/utils";

type SidebarItemProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: "Tablet" | "Mobile";
  IconComponent: React.ReactElement;
  href: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function SidebarItem({
  children,
  variant = "Mobile",
  className,
  IconComponent,
  href,
  ...props
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="block">
      <button
        className={cn(
          "group flex flex-col items-center justify-center gap-space50 rounded-tl-lg rounded-tr-lg bg-Grey900 pb-space150 pt-space100 font-bold text-Grey300 hover:text-Grey100",
          {
            "h-11 w-20": variant === "Mobile",
            "h-[66px] w-28": variant === "Tablet",
            "border-b-4 border-b-Green bg-Beige100 text-Grey900 hover:text-Grey900":
              isActive,
          },
          className,
        )}
        {...props}
      >
        {React.cloneElement(IconComponent, {
          className: cn(IconComponent.props.className, {
            "fill-Green": isActive,
            "group-hover:fill-Grey100": !isActive,
          }),
        })}
        {children}
      </button>
    </Link>
  );
}

export function SidebarMobile() {
  return (
    <div className="flex h-[52px] w-full flex-row justify-between bg-Grey900 px-space200 pt-space100">
      <SidebarItem IconComponent={<IconNavOverview />} href="/dashboard" />
      <SidebarItem
        IconComponent={<IconNavTransactions />}
        href="/transactions"
      />
      <SidebarItem IconComponent={<IconNavBudgets />} href="/budgets" />
      <SidebarItem IconComponent={<IconNavPots />} href="/pots" />
      <SidebarItem
        IconComponent={<IconNavReccurringBills />}
        href="/recurring-bills"
      />
    </div>
  );
}

export function SidebarTablet() {
  return (
    <div className="flex h-[74px] w-full flex-row justify-between bg-Grey900 px-space500 pt-space100">
      <SidebarItem
        variant="Tablet"
        IconComponent={<IconNavOverview />}
        href="/dashboard"
      >
        Overview
      </SidebarItem>
      <SidebarItem
        variant="Tablet"
        IconComponent={<IconNavTransactions />}
        href="/transactions"
      >
        Transactions
      </SidebarItem>
      <SidebarItem
        variant="Tablet"
        IconComponent={<IconNavBudgets />}
        href="/budgets"
      >
        Budgets
      </SidebarItem>
      <SidebarItem
        variant="Tablet"
        IconComponent={<IconNavPots />}
        href="/pots"
      >
        Pots
      </SidebarItem>
      <SidebarItem
        variant="Tablet"
        IconComponent={<IconNavReccurringBills />}
        href="/recurring-bills"
      >
        Recurring bills
      </SidebarItem>
    </div>
  );
}
