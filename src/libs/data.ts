import "server-only";
import { sql } from "@vercel/postgres";
import { Balance, User } from "@/libs/definitions";

export const getUser = async (id: number) => {
  try {
    const { rows } =
      await sql<User>`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
    // const user = await db.user.findUnique({
    //   where: { id },
    // });

    if (rows.length == 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
};

export const updateBalance = async (userId: number, amount: number) => {
  // console.log("userId", userId);
  const { rows } =
    await sql<Balance>`SELECT * FROM balances WHERE "userId" = ${userId} LIMIT 1`;
  // const currentBalance = await db.balance.findFirst({
  //   where: { userId },
  // });
  if (rows.length == 0) {
    await sql`
      INSERT INTO balances 
      ("userId", current, income, expenses)
      VALUES (${userId}, ${amount}, 0, 0)
    `;
    // await db.balance.create({
    //   data: {
    //     userId,
    //     current: amount,
    //     income: 0,
    //     expenses: 0,
    //   },
    // });
    return;
  }
  await sql`
    UPDATE balances
    SET current = ${rows[0].current + amount}
    WHERE "userId" = ${userId}
  `;
  // const updatedBalance = {
  //   current: currentBalance.current + amount,
  // };
  // await db.balance.update({
  //   where: { userId },
  //   data: updatedBalance,
  // });
};
