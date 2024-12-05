"use server";

import { revalidatePath } from "next/cache";

import { updateBalance } from "@/libs/data";

import { logoMapping } from "@/libs/utils";
import {
  AddNewTransactionFormSchema,
  addNewTransactionSchema,
} from "@/libs/validations";

import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { Balance } from "@/libs/definitions";

export const addTransaction = async (data: AddNewTransactionFormSchema) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, message: "Invalid token" };
  }
  const { rows } =
    await sql<Balance>`SELECT * FROM balances WHERE "userId" = ${userId} LIMIT 1`;
  // const balance = await db.balance.findFirst({
  //   where: {
  //     userId,
  //   },
  // });
  const isValid = addNewTransactionSchema.safeParse(data);
  if (!isValid.success) {
    return { success: false, message: "Invalid data" };
  }
  if (rows.length == 0) {
    return { success: false, message: "No balance found" };
  }
  const balance = rows[0];
  if (data.amount < 0 && Math.abs(data.amount) > balance.current) {
    return { success: false, message: "Insufficient balance" };
  }

  const avatar = logoMapping[data.category] || "/images/Logo-1.jpg";

  try {
    await sql`
      INSERT INTO transactions
      ("userId", name, "Category", amount, recurring, avatar, date)
      VALUES (${userId}, ${data.name}, ${data.category}, ${data.amount}, ${data.recurring || false}, ${avatar}, ${data.date})
    `;
    // await db.transaction.create({
    //   data: {
    //     userId,
    //     name: data.name,
    //     Category: data.category,
    //     amount: data.amount,
    //     recurring: data.recurring || false,
    //     avatar,
    //     date: data.date,
    //   },
    // });

    // Update balance
    await updateBalance(Number(userId), data.amount);

    revalidatePath("/", "layout");

    return { success: true, message: "Transaction added successfully" };
  } catch (error) {
    return { success: false, message: "Error adding transaction" };
  }
};
