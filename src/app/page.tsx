import React from "react";
import Button from "@/components/button";
import Tab from "@/components/tab";
import FormField from "@/components/form";
import { IconCaretRight, IconCaretLeft, IconSearch } from "@/icons";

export default function page() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center gap-space200">
        <FormField
          label="Basic Field"
          placeholder="Placeholder"
          helperText="Helper text"
          IconComponent={<IconSearch />}
        />
      </div>
    </>
  );
}
