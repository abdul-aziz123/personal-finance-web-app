import React from "react";
import Button from "@/components/button";
import Tab from "@/components/tab";
import { IconCaretRight, IconCaretLeft } from "@/icons";

export default function page() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center gap-space200">
        <Button variant="page">
          <IconCaretLeft className="fill-Grey900 group-hover:fill-white" />
          Prev
        </Button>

        <Button
          variant="page"
          className="size-space500 active:bg-Grey900 active:text-white"
        >
          1
        </Button>
        <Button variant="page">
          Next
          <IconCaretRight className="fill-Grey900 group-hover:fill-white" />
        </Button>
      </div>
    </>
  );
}
