"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FormField from "./form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";

const AddNewTransactionForm = () => {
  const [transactionName, setTransactionName] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      transactionName,
      transactionDate,
      transactionCategory,
      transactionAmount,
      isRecurring,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Add New Transaction</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="transactionName" className="mb-1 block font-medium">
              Transaction Name
            </label>
            <FormField
              id="transactionName"
              placeholder="e.g Urban Sevices Hub"
              value={transactionName}
              onChange={(e) => setTransactionName(e.target.value)}
              helperText={`${30 - transactionName.length} characters left`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="transactionDate" className="mb-1 block font-medium">
              Transaction Date
            </label>
            <FormField
              id="transactionDate"
              type="date"
              value={transactionDate}
              placeholder="e.g 2022-12-31"
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="transactionCategory"
              className="mb-1 block font-medium"
            >
              Category
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100">
                {transactionCategory || "Select a Category"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36 rounded-md bg-white p-1 shadow-lg">
                <DropdownMenuItem
                  onClick={() => setTransactionCategory("Entertainment")}
                >
                  Entertainment
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTransactionCategory("Bills")}
                >
                  Bills
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTransactionCategory("Groceries")}
                >
                  Groceries
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTransactionCategory("Dining Out")}
                >
                  Dining Out
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTransactionCategory("Transportation")}
                >
                  Transportation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mb-4">
            <label
              htmlFor="transactionAmount"
              className="mb-1 block font-medium"
            >
              Amount
            </label>
            <FormField
              id="transactionAmount"
              type="text"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              placeholder="e.g $1000"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isRecurring" className="flex items-center">
              <input
                id="isRecurring"
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="mr-2"
              />
              Recurring
            </label>
          </div>
          <Button type="submit" className="h-12 w-full bg-Grey900">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTransactionForm;
