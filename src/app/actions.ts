"use server";

import { auth, signIn } from "@/auth";
import { getAllUserPots, getCategoryId, getCurrentBalance } from "@/libs/db";
import {
  addWithdrawFromPotSchema,
  potSchema,
  registerSchema,
  transactionSchema,
} from "@/libs/schema";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function signInWithGithub() {
  await signIn("github");
}

export async function initializeAccount(
  values: z.infer<typeof registerSchema>,
): Promise<{ success: boolean; message?: string }> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Please Login" };
  }

  const user = session.user;
  const { currentBalance, mainIncome, sideIncome } = values;
  try {
    await sql`INSERT INTO balances ("userId", current_balance, main_income, side_income , expenses) VALUES (${user.id}, ${currentBalance}, ${mainIncome}, ${sideIncome} , 0)`;
    return { success: true };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}

export type TransactionFormState = {
  success: boolean;
  message: string;
};

export async function addTransaction(
  values: z.infer<typeof transactionSchema>,
): Promise<TransactionFormState> {
  const session = await auth();
  if (!session?.user) {
    return { message: "Please Login", success: false };
  }

  const user = session.user;
  const {
    transactor,
    category,
    transaction_date,
    amount,
    is_recurring,
    is_withdrawal,
  } = values;
  try {
    const accountCurrentBalance = await getCurrentBalance(user.id as string);
    if (is_withdrawal && accountCurrentBalance < amount) {
      return { message: "Insufficient Balance", success: false };
    }
    const categoryId = await getCategoryId(category);
    await sql`INSERT INTO transactions ("userId", transactor, "categoryId", transaction_date, amount, is_recurring, is_withdrawal) VALUES (${user.id}, ${transactor}, ${categoryId}, ${transaction_date}, ${amount}, ${is_recurring}, ${is_withdrawal})`;
    const newAccountBalance = is_withdrawal
      ? accountCurrentBalance - amount
      : accountCurrentBalance + amount;
    await sql`UPDATE balances SET current_balance = ${newAccountBalance} WHERE "userId" = ${user.id}`;
    revalidatePath("/transactions");
    return { message: "Transaction Added", success: true };
  } catch (e) {
    return { message: "Something went wrong", success: false };
  }
}

export type PotFormState = {
  success: boolean;
  message: string;
};

export async function addPot(
  values: z.infer<typeof potSchema>,
): Promise<PotFormState> {
  const session = await auth();
  if (!session?.user) {
    return { message: "Please Login", success: false };
  }

  const user = session.user;
  const { potName, targetAmount, theme } = values;
  try {
    const pots = await getAllUserPots(user.id as string);
    if (pots.length >= 11) {
      return { message: "You can only have 11 pots", success: false };
    }
    if (
      pots.filter((pot) => pot.pot_name.toLowerCase() === potName.toLowerCase())
        .length > 0
    ) {
      return { message: "Pot with this name already exists", success: false };
    }
    if (targetAmount < 1) {
      return {
        message: "Target amount should be greater than 0",
        success: false,
      };
    }
    if (pots.filter((pot) => pot.theme === theme).length > 0) {
      return { message: "Pot with this theme already exists", success: false };
    }
    await sql`INSERT INTO pots ("userId", pot_name, target_amount, theme, current_amount) VALUES (${user.id}, ${potName}, ${targetAmount}, ${theme}, 0)`;
    revalidatePath("/pots");
    return { message: "Pot Added", success: true };
  } catch (e) {
    return { message: "Something went wrong", success: false };
  }
}

export async function DeletePot() {
  const session = await auth();
  if (!session?.user) {
    return { message: "Please Login", success: false };
  }

  const user = session.user;
  try {
    await sql`DELETE FROM pots WHERE "userId" = ${user.id}`;
    revalidatePath("/pots");
    return { message: "Pot Deleted", success: true };
  } catch (e) {
    return { message: "Something went wrong", success: false };
  }
}

export async function addWithdrawFromPot(
  values: z.infer<typeof addWithdrawFromPotSchema>,
): Promise<PotFormState> {
  const session = await auth();
  if (!session?.user) {
    return { message: "Please Login", success: false };
  }

  const user = session.user;
  const { potName, targetAmount, currentAmount, amount, isAdd } = values;
  try {
    if (!isAdd && amount > currentAmount) {
      return {
        message:
          "Amount should be less than or equal to current amount from server side",
        success: false,
      };
    }
    if (isAdd && amount > targetAmount) {
      return {
        message:
          "Amount should be less than or equal to target amount from server side",
        success: false,
      };
    }
    if (amount > targetAmount) {
      return {
        message: "Amount should be less than or equal to target amount",
        success: false,
      };
    }
    // get current balance
    const accountCurrentBalance = await getCurrentBalance(user.id as string);
    if (isAdd && accountCurrentBalance < amount) {
      return { message: "Insufficient Balance", success: false };
    }
    if (!isAdd && currentAmount < amount) {
      return { message: "Insufficient Amount in Pot", success: false };
    }

    const newCurrentAmount = isAdd
      ? currentAmount + amount
      : currentAmount - amount;
    await sql`UPDATE pots
      SET current_amount = ${newCurrentAmount}
      WHERE "userId" = ${user.id} AND pot_name = ${potName}`;

    const newCurrentBalance = isAdd
      ? accountCurrentBalance - amount
      : accountCurrentBalance + amount;
    await sql`UPDATE balances
    SET current_balance = ${newCurrentBalance} WHERE "userId" = ${user.id}`;

    revalidatePath("/pots");
    return { message: "Pot edited successfully", success: true };
  } catch (e) {
    return { message: "Something went wrong", success: false };
  }
}
