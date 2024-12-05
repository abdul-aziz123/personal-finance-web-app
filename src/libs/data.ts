import "server-only";
import { sql } from "@vercel/postgres";
import { Balance, User } from "@/libs/definitions";

export const getUser = async (id: number) => {
  try {
    const { rows } =
      await sql<User>`SELECT * FROM users WHERE id = ${id} LIMIT 1`;

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

  if (rows.length == 0) {
    await sql`
      INSERT INTO balances 
      ("userId", current, income, expenses)
      VALUES (${userId}, ${amount}, 0, 0)
    `;
    return;
  }
  await sql`
    UPDATE balances
    SET current = ${rows[0].current + amount}
    WHERE "userId" = ${userId}
  `;
};
