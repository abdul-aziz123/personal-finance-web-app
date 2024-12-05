"use server";

import { revalidatePath } from "next/cache";

import { AddNewBudgetSchema, addNewBudgetSchema } from "@/libs/validations";

import { auth } from "@/auth";
import { sql } from "@vercel/postgres";

export const addBudget = async (values: AddNewBudgetSchema) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  const isValid = addNewBudgetSchema.safeParse(values);

  if (!isValid) {
    return { success: false, message: "invalid data" };
  }

  try {
    await sql`
      INSERT INTO budgets (amount, category, theme, "userId")
      VALUES (${values.maximumSpend}, ${values.categories}, ${values.theme}, ${userId})
    `;

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Budget is created successfully",
    };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Someting went wrong" };
  }
};
export const deleteBudget = async (id: string | number) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  try {
    await sql`DELETE FROM budgets WHERE id = ${Number(id)}`;
    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Budget is deleted successfully",
    };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Someting went wrong" };
  }
};
export const editBudget = async (
  values: AddNewBudgetSchema,
  id: string | number,
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  const isValid = addNewBudgetSchema.safeParse(values);

  if (!isValid) {
    return { success: false, message: "invalid data" };
  }

  try {
    await sql`
      UPDATE budgets
      SET amount = ${values.maximumSpend}, category = ${values.categories}, theme = ${values.theme}
      WHERE id = ${Number(id)} AND "userId" = ${userId}
    `;

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Budget is created successfully",
    };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Someting went wrong" };
  }
};
