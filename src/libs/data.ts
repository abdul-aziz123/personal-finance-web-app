import "server-only";

import db from "./db";

export const getUser = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
};

export const updateBalance = async (userId: string, amount: number) => {
  const currentBalance = await db.balance.findFirst({
    where: { userId },
  });
  if (!currentBalance) {
    await db.balance.create({
      data: {
        userId,
        current: amount,
        income: 0,
        expenses: 0,
      },
    });
    return;
  }

  const updatedBalance = {
    current: currentBalance.current + amount,
  };
  await db.balance.update({
    where: { userId },
    data: updatedBalance,
  });
};
