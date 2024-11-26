import React from "react";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import Button from "@/components/button";
import AddNewPot from "@/components/AddPot";

export default function Pots() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">Pots</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary" className="text-sm">
                + Add New Pot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddNewPot />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
