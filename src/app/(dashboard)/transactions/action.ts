"use server";

import { revalidatePath } from "next/cache";

import { updateBalance } from "@/libs/data";

import { logoMapping } from "@/libs/utils";
import {
  AddNewTransactionFormSchema,
  addNewTransactionSchema,
} from "@/libs/validations";

import { auth } from "@/auth";

export const addTransaction = async (data: AddNewTransactionFormSchema) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }
  const balance = await db.balance.findFirst({
    where: {
      userId,
    },
  });
  const isValid = addNewTransactionSchema.safeParse(data);
  if (!isValid.success) {
    return { success: false, message: "Invalid data" };
  }
  if (balance == null) {
    return { success: false, message: "No balance found" };
  }
  if (data.amount < 0 && Math.abs(data.amount) > balance?.current) {
    return { success: false, message: "Insufficient balance" };
  }

  const avatar = logoMapping[data.category] || "/images/Logo-1.jpg";

  try {
    await db.transaction.create({
      data: {
        userId,
        name: data.name,
        Category: data.category,
        amount: data.amount,
        recurring: data.recurring || false,
        avatar,
        date: data.date,
      },
    });

    // Update balance
    await updateBalance(userId, data.amount);

    revalidatePath("/", "layout");

    return { success: true, message: "Transaction added successfully" };
  } catch (error) {
    return { success: false, message: "Error adding transaction" };
  }
};