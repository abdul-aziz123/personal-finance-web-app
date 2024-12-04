"use server";

import { Theme } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { updateBalance } from "@/libs/data";

import { AddNewPotsFormSchema, addNewPotsSchema } from "@/libs/validations";

import { POSTS } from "./constants";
import { auth } from "@/auth";

export const addPot = async ({
  name,
  target,
  theme,
}: {
  name: string;
  target: number;
  theme: string;
}) => {
  // check if the token is valid
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  // Check if the user already has a pot with the same theme
  const existingPot = await db.pot.findFirst({
    where: {
      userId,
      theme: theme.toUpperCase() as Theme,
    },
  });

  if (existingPot) {
    return {
      success: false,
      message: `You already have a pot with the theme ${theme}. Please choose another theme.`,
    };
  }

  // check if the values are valid
  const isValid = addNewPotsSchema.safeParse({ potName: name, target, theme });
  if (!isValid.success) {
    return { success: false, message: JSON.stringify(isValid.error.errors) };
  }

  try {
    await db.pot.create({
      data: {
        name,
        target,
        theme: theme.toUpperCase() as Theme,
        total: 0,
        userId,
      },
    });
    revalidatePath("/", "layout");
    return { success: true, message: "Pot added successfully" };
  } catch (error) {
    console.error("Error adding pot:", error);
    return { success: false, message: "Error adding pot" };
  }
};

export const getThemesForBudget = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token", data: [] };
  }

  const userBudgets = await db.budget.findMany({
    where: { userId },
    select: { theme: true },
  });

  const usedThemes = userBudgets.map((pot) => pot.theme);

  const themesWithUsage = POSTS.map((post) => ({
    name: post.name,
    value: post.value,
    isUsed: usedThemes.includes(post.value as Theme),
  }));

  return { success: true, data: themesWithUsage };
};

export const getThemesForPot = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token", data: [] };
  }

  const userPots = await db.pot.findMany({
    where: { userId },
    select: { theme: true },
  });

  const usedThemes = userPots.map((pot) => pot.theme);

  const themesWithUsage = POSTS.map((post) => ({
    name: post.name,
    value: post.value,
    isUsed: usedThemes.includes(post.value as Theme),
  }));

  return { success: true, data: themesWithUsage };
};
export const deletePot = async (potId: number) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  try {
    const res = await db.pot.findFirst({
      where: {
        id: potId,
      },
    });
    if (res === null) {
      return { success: false, message: "Pot not found" };
    }
    await db.pot.delete({
      where: {
        id: potId,
      },
    });
    await updateBalance(userId, res.total);
    revalidatePath("/", "layout");
    return { success: true, message: "Pot deleted successfully" };
  } catch (error) {
    console.error("Error deleting pot:", error);
    return { success: false, message: "Error deleting pot" };
  }
};
export const updatePot = async (id: number, values: AddNewPotsFormSchema) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  try {
    const updatedPot = await db.pot.update({
      where: { id },
      data: {
        name: values.potName,
        target: values.target,
        theme: values.theme,
      },
    });

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Pot updated successfully",
      data: updatedPot,
    };
  } catch (error) {
    console.error("Error updating pot:", error);
    return { success: false, message: "Failed to update pot" };
  }
};
export const withdrawMoney = async (potId: number, amount: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  try {
    const pot = await db.pot.findFirst({
      where: {
        id: potId,
        userId,
      },
    });

    if (!pot) {
      return { success: false, message: "Pot not found" };
    }

    if (pot.total < amount) {
      return { success: false, message: "Insufficient funds" };
    }

    await db.pot.update({
      where: { id: potId },
      data: {
        total: {
          decrement: amount,
        },
      },
    });
    await updateBalance(userId, amount);

    revalidatePath("/", "layout");
    return { success: true, message: "Money withdrawn successfully" };
  } catch (error) {
    console.error("Error withdrawing money:", error);
    return { success: false, message: "Error withdrawing money" };
  }
};
export const addMoney = async (potId: number, amount: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  try {
    const pot = await db.pot.findFirst({
      where: {
        id: potId,
        userId,
      },
    });

    if (!pot) {
      return { success: false, message: "Pot not found" };
    }
    if (pot.total + amount > pot.target) {
      return {
        success: false,
        message: `Amount exceeds the target of ${pot.target}`,
      };
    }

    const balance = await db.balance.findFirst({
      where: {
        userId,
      },
    });
    if (!balance) {
      return { success: false, message: "Balance not found" };
    }
    if (amount > balance.current) {
      return { success: false, message: "Insufficient funds" };
    }

    await db.pot.update({
      where: { id: potId },
      data: {
        total: {
          increment: amount,
        },
      },
    });
    await updateBalance(userId, -amount);

    revalidatePath("/", "layout");

    return { success: true, message: "Money added successfully" };
  } catch (error) {
    console.error("Error adding money:", error);
    return { success: false, message: "Error adding money" };
  }
};
export const getPot = async (id: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Invalid token" };
  }

  try {
    const pot = await db.pot.findFirst({
      where: {
        id,
      },
    });

    if (!pot) {
      return { success: false, message: "Pot not found" };
    }

    return { success: true, message: "pot found", data: pot };
  } catch (error) {
    console.error("Error getting pot:", error);
    return { success: false, message: "Error getting pot" };
  }
};
