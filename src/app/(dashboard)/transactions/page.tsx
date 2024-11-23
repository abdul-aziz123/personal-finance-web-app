"use client";

import React, { useState } from "react";
import { AddTransactionModal } from "@/components/ui/addTransaction";

export default function TransactionPage() {
  // Preloaded sample transactions
  const [transactions, setTransactions] = useState<any[]>([
    {
      transactionName: "Urban Services Hub",
      date: "2024-08-15",
      category: "General",
      amount: 150.5,
      isRecurring: false,
    },
    {
      transactionName: "Savory Bliss Bistro",
      date: "2024-08-16",
      category: "Dining Out",
      amount: 65.25,
      isRecurring: false,
    },
    {
      transactionName: "Grocery Store",
      date: "2024-08-17",
      category: "Groceries",
      amount: 120.0,
      isRecurring: true,
    },
  ]);

  const handleAddTransaction = (newTransaction: any) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-lg font-bold">Finance</h1>
          {/* Sidebar Links */}
          <ul className="mt-6 space-y-4">
            <li>Overview</li>
            <li>Transactions</li>
            <li>Budgets</li>
            <li>Pots</li>
            <li>Recurring Bills</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Transactions</h2>
          <AddTransactionModal onAddTransaction={handleAddTransaction} />
        </div>
        {transactions.length === 0 ? (
          <p className="mt-6 text-gray-600">No transactions found. Add one!</p>
        ) : (
          <table className="mt-6 w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Recurring</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border p-2">{transaction.transactionName}</td>
                  <td className="border p-2">{transaction.date}</td>
                  <td className="border p-2">{transaction.category}</td>
                  <td className="border p-2">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {transaction.isRecurring ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
