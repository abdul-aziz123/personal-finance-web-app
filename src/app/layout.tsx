import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import ToggleableSidebar from "@/components/sidebar_desktop";
import { SidebarMobile, SidebarTablet } from "@/components/sidebar_tabmobile";
import "@/app/globals.css";

const public_sans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${public_sans.className} antialiased`}>
        <div className="relative flex min-h-screen bg-Beige100">
          <div className="absolute bottom-0 w-full md:hidden lg:hidden">
            <SidebarMobile />
          </div>
          <div className="absolute bottom-0 hidden w-full md:block lg:hidden">
            <SidebarTablet />
          </div>
          <div className="hidden md:hidden lg:block">
            <ToggleableSidebar />
          </div>
          <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

// import React from "react";
// import Button from "@/components/button";
// import Tab from "@/components/tab";
// import FormField from "@/components/form";

// import { IconCaretRight, IconCaretLeft, IconSearch } from "@/icons";
// import { Span } from "next/dist/trace";
// import { Sidebar } from "lucide-react";

// export default function Page() {
//   return (
//     <div className="relative min-h-screen bg-Beige100">
//       <div className="absolute bottom-0 w-full md:hidden lg:hidden">
//         <SidebarMobile />
//       </div>
//       <div className="absolute bottom-0 hidden w-full md:block lg:hidden">
//         <SidebarTablet />
//       </div>
//       <div className="hidden md:hidden lg:block">
//         <ToggleableSidebar />
//       </div>
//     </div>
//   );
// }
