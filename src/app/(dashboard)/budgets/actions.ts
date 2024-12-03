"use server";

import { revalidatePath } from "next/cache";

import db from "@/libs/db";
import { AddNewBudgetSchema, addNewBudgetSchema } from "@/libs/validations";

import { auth } from "@/auth";

export const addBudget = async (values: AddNewBudgetSchema) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  const isValid = addNewBudgetSchema.safeParse(values);

  if (!isValid) {
    return { success: false, message: "invalid data" };
  }

  try {
    await db.budget.create({
      data: {
        amount: values.maximumSpend,
        category: values.categories,
        theme: values.theme,
        userId,
      },
    });

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

  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  try {
    await db.budget.delete({
      where: {
        id: Number(id),
      },
    });

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

  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  const isValid = addNewBudgetSchema.safeParse(values);

  if (!isValid) {
    return { success: false, message: "invalid data" };
  }

  try {
    await db.budget.update({
      where: {
        id: Number(id),
        userId: userId,
      },
      data: {
        amount: values.maximumSpend,
        category: values.categories,
        theme: values.theme,
      },
    });

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
