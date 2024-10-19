import React from "react";
import Button from "@/components/button";
import Tab from "@/components/tab";
import FormField from "@/components/form";
import SidebarFull, { SidebarItem } from "@/components/sidebar";
import { IconCaretRight, IconCaretLeft, IconSearch } from "@/icons";
import { Span } from "next/dist/trace";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-space200 bg-orange-400">
      {/* <FormField
        label="Basic Field"
        placeholder="Placeholder"
        helperText="Helper text"
        IconComponent={
          <span className="fill-Grey500 hover:fill-Grey900 active:fill-Grey900">
            <IconCaretRight className="fill-current" />
          </span>
        }
      /> */}
      {/* <Button variant="page">
        Primary <IconCaretLeft />
      </Button> */}

      {/* <Tab>Tab</Tab> */}
      {/* <SidebarItem variant="Menu">Placeholder</SidebarItem> */}
      <SidebarFull />
    </div>
  );
}
