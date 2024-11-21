"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// Zod Schema for Validation
const transactionSchema = z.object({
  transactionName: z
    .string()
    .min(1, "Transaction name is required")
    .max(30, "Transaction name cannot exceed 30 characters"),
  date: z.string().nonempty("Date is required"),
  category: z.string().nonempty("Category is required"),
  amount: z.number().positive("Amount must be greater than zero"),
  isRecurring: z.boolean().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export function AddTransactionModal({
  onAddTransaction,
}: {
  onAddTransaction: (transaction: TransactionFormData) => void;
}) {
  const { control, handleSubmit, register, reset } =
    useForm<TransactionFormData>({
      resolver: zodResolver(transactionSchema),
      defaultValues: {
        transactionName: "",
        date: "",
        category: "",
        amount: 0,
        isRecurring: false,
      },
    });

  const onSubmit = (data: TransactionFormData) => {
    onAddTransaction(data);
    reset(); // Reset the form after submission
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-md bg-black px-4 py-2 text-white">
          + Add New Transaction
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold">
            Add New Transaction
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <label>
              Transaction Name
              <input
                type="text"
                {...register("transactionName")}
                className="w-full rounded-md border p-2"
              />
            </label>
            <label>
              Transaction Date
              <input
                type="date"
                {...register("date")}
                className="w-full rounded-md border p-2"
              />
            </label>
            <label>
              Category
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="w-full rounded-md border p-2">
                        {field.value || "Select a category"}
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="rounded-md bg-white p-2 shadow">
                      {["General", "Bills", "Groceries", "Entertainment"].map(
                        (category) => (
                          <DropdownMenu.Item
                            key={category}
                            className="cursor-pointer p-2 hover:bg-gray-100"
                            onSelect={() => field.onChange(category)}
                          >
                            {category}
                          </DropdownMenu.Item>
                        ),
                      )}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                )}
              />
            </label>
            <label>
              Amount
              <input
                type="number"
                {...register("amount", { valueAsNumber: true })}
                className="w-full rounded-md border p-2"
              />
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("isRecurring")} />
              Recurring
            </label>
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              Submit
            </button>
          </form>
          <Dialog.Close asChild>
            <button className="absolute right-2 top-2">X</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
