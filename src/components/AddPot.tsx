"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FormField from "./form";
import ThemeSelector from "./ui/ThemeSelector";

const AddNewPot = () => {
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      potName,
      target,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Add New Pot</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="potName" className="mb-1 block font-medium">
              Pot Name
            </label>
            <FormField
              id="potName"
              placeholder="e.g. Rainy Days"
              value={potName}
              onChange={(e) => setPotName(e.target.value)}
              helperText={`${30 - potName.length} characters left`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="target" className="mb-1 block font-medium">
              Target
            </label>
            <FormField
              id="target"
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. $2000"
            />
          </div>
          <div className="mb-4">
            <ThemeSelector />
          </div>
          <Button
            type="submit"
            className="h-12 w-full bg-Grey900 text-white hover:bg-Grey900"
          >
            Add Pot
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPot;
