"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import { ArrowsDownUp, ChartDonut, House, Jar, Receipt } from "./ui/icons";

const NAV_LINKS = [
  {
    id: 0,
    name: "Overview",
    icon: <House />,
    link: "/",
  },
  {
    id: 1,
    name: "Transactions",
    icon: <ArrowsDownUp />,
    link: "/transactions",
  },
  {
    id: 2,
    name: "Budgets",
    icon: <ChartDonut />,
    link: "/budgets",
  },
  {
    id: 3,
    name: "Pots",
    icon: <Jar />,
    link: "/pots",
  },
  {
    id: 4,
    name: "Recurring bills",
    icon: <Receipt />,
    link: "/recurring-bills",
  },
] as const;
type NavLinkType = (typeof NAV_LINKS)[number];

export default function MobileSideBar() {
  return (
    <div className="bg-grey-900 text-grey-300 fixed bottom-0 left-0 right-0 z-50 h-11 w-full rounded-t-lg px-4 pt-2 md:h-[66px] md:px-10 lg:hidden">
      <div className="flex h-full w-full">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}

function NavLink({ link }: { link: NavLinkType }) {
  const pathname = usePathname();

  return (
    <Link
      href={link.link}
      className={cn(
        "inline-flex h-full w-full flex-1 flex-col items-center justify-center gap-1",
        {
          "border-secondary-green text-secondary-green rounded-t-lg border-b-4 bg-white":
            link.link === pathname,
        },
      )}
    >
      <span>{link.icon}</span>
      <p
        className={cn(
          "text-preset-5 text-grey-300 hidden text-xs font-bold md:block",
          {
            "text-grey-900": link.link === pathname,
          },
        )}
      >
        {link.name}
      </p>
    </Link>
  );
}
