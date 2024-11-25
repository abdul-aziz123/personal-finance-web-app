import React from "react";
import ToggleableSidebar from "@/components/sidebar_desktop";
import { SidebarMobile, SidebarTablet } from "@/components/sidebar_tabmobile";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen bg-Beige100">
      <div className="absolute bottom-0 w-full md:hidden lg:hidden">
        <SidebarMobile />
      </div>
      <div className="absolute bottom-0 hidden w-full md:block lg:hidden">
        <SidebarTablet />
      </div>
      <div className="hidden h-full md:hidden lg:relative lg:block">
        <ToggleableSidebar />
      </div>
      <main className="flex-grow overflow-scroll p-6 md:p-5">{children}</main>
    </div>
  );
}
