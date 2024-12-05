"use server";

import { Balance, Pot, Theme } from "@/libs/definitions";
import { revalidatePath } from "next/cache";

import { updateBalance } from "@/libs/data";

import { AddNewPotsFormSchema, addNewPotsSchema } from "@/libs/validations";

import { POSTS } from "./constants";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";

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
  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  // Check if the user already has a pot with the same theme
  const { rows } =
    await sql<Pot>`SELECT * FROM pots WHERE "userId" = ${userId} AND theme = ${theme}`;
  // const existingPot = await db.pot.findFirst({
  //   where: {
  //     userId,
  //     theme: theme.toUpperCase() as Theme,
  //   },
  // });

  if (rows.length > 0) {
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
    await sql`INSERT INTO pots (name, target, theme, total, "userId") VALUES (${name}, ${target}, ${theme}, 0, ${userId})`;
    // await db.pot.create({
    //   data: {
    //     name,
    //     target,
    //     theme: theme.toUpperCase() as Theme,
    //     total: 0,
    //     userId,
    //   },
    // });
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

  if (!userId) {
    return { success: false, message: "Invalid token", data: [] };
  }
  const { rows: userBudgets } =
    await sql`SELECT theme FROM budgets WHERE "userId" = ${userId}`;
  // const userBudgets = await db.budget.findMany({
  //   where: { userId },
  //   select: { theme: true },
  // });

  const usedThemes = userBudgets.map((budget) => budget.theme);

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

  if (!userId) {
    return { success: false, message: "Invalid token", data: [] };
  }

  const { rows: userPots } =
    await sql`SELECT theme FROM pots WHERE "userId" = ${userId}`;
  // const userPots = await db.pot.findMany({
  //   where: { userId },
  //   select: { theme: true },
  // });

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

  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  try {
    const { rows } =
      await sql<Pot>`SELECT * FROM pots WHERE id = ${potId} LIMIT 1`;
    // const res = await db.pot.findFirst({
    //   where: {
    //     id: potId,
    //   },
    // });
    if (rows.length == 0) {
      return { success: false, message: "Pot not found" };
    }
    await sql`DELETE FROM pots WHERE id = ${potId}`;
    // await db.pot.delete({
    //   where: {
    //     id: potId,
    //   },
    // });
    await updateBalance(Number(userId), rows[0].total);
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

  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  try {
    const { rows } = await sql<Pot>`
      UPDATE pots
      SET name = ${values.potName}, target = ${values.target}, theme = ${values.theme}
      WHERE id = ${id}
      RETURNING *
    `;
    // const updatedPot = await db.pot.update({
    //   where: { id },
    //   data: {
    //     name: values.potName,
    //     target: values.target,
    //     theme: values.theme,
    //   },
    // });

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Pot updated successfully",
      data: rows[0],
    };
  } catch (error) {
    console.error("Error updating pot:", error);
    return { success: false, message: "Failed to update pot" };
  }
};
export const withdrawMoney = async (potId: number, amount: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  try {
    const { rows } =
      await sql<Pot>`SELECT * FROM pots WHERE id = ${potId} AND "userId" = ${userId} LIMIT 1`;
    // const pot = await db.pot.findFirst({
    //   where: {
    //     id: potId,
    //     userId,
    //   },
    // });

    if (rows.length == 0) {
      return { success: false, message: "Pot not found" };
    }

    if (rows[0].total < amount) {
      return { success: false, message: "Insufficient funds" };
    }
    await sql`
      UPDATE pots
      SET total = ${rows[0].total - amount}
      WHERE id = ${potId}
    `;
    // await db.pot.update({
    //   where: { id: potId },
    //   data: {
    //     total: {
    //       decrement: amount,
    //     },
    //   },
    // });
    await updateBalance(Number(userId), amount);

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
  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  try {
    const { rows } =
      await sql<Pot>`SELECT * FROM pots WHERE id = ${potId} AND "userId" = ${userId} LIMIT 1`;
    // const pot = await db.pot.findFirst({
    //   where: {
    //     id: potId,
    //     userId,
    //   },
    // });

    if (rows.length == 0) {
      return { success: false, message: "Pot not found" };
    }
    if (rows[0].total + amount > rows[0].target) {
      return {
        success: false,
        message: `Amount exceeds the target of ${rows[0].target}`,
      };
    }
    const { rows: balances } =
      await sql<Balance>`SELECT * FROM balances WHERE "userId" = ${userId} LIMIT 1`;
    // const balance = await db.balance.findFirst({
    //   where: {
    //     userId,
    //   },
    // });
    if (balances.length == 0) {
      return { success: false, message: "Balance not found" };
    }
    if (amount > balances[0].current) {
      return { success: false, message: "Insufficient funds" };
    }
    await sql`
      UPDATE pots
      SET total = ${rows[0].total + amount}
      WHERE id = ${potId}
    `;
    // await db.pot.update({
    //   where: { id: potId },
    //   data: {
    //     total: {
    //       increment: amount,
    //     },
    //   },
    // });
    await updateBalance(Number(userId), -amount);

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
  if (!userId) {
    return { success: false, message: "Invalid token" };
  }

  try {
    const { rows } =
      await sql<Pot>`SELECT * FROM pots WHERE id = ${id} AND "userId" = ${userId} LIMIT 1`;
    // const pot = await db.pot.findFirst({
    //   where: {
    //     id,
    //   },
    // });

    if (rows.length == 0) {
      return { success: false, message: "Pot not found" };
    }

    return { success: true, message: "pot found", data: rows[0] };
  } catch (error) {
    console.error("Error getting pot:", error);
    return { success: false, message: "Error getting pot" };
  }
};
