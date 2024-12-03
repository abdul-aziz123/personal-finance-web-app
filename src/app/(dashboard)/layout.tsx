import MobileSideBar from "@/components/mobile-sidebar";
import SideBar from "@/components/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <MobileSideBar />
      <SideBar />
      <div className="flex-1 overflow-scroll px-4 py-6 md:px-10 md:py-8">
        {children}
      </div>
    </div>
  );
}
