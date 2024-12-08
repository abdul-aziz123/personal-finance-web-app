import React from "react";
import UpdateIncome from "./update-income";

export default function page() {
  return (
    <div className="container mx-auto flex flex-col gap-8">
      <h1 className="text-preset-1 text-grey-900">Account Settings</h1>
      <div className="flex rounded-lg bg-white">
        <UpdateIncome />
      </div>
    </div>
  );
}
