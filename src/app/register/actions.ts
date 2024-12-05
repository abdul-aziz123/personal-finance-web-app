"use server";

import { auth } from "@/auth";
import { Balance } from "@/libs/definitions";
import { addIncomeSchema } from "@/libs/validations";
import { sql } from "@vercel/postgres";
import { z } from "zod";

export async function addIncome(values: z.infer<typeof addIncomeSchema>) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "Invalid token" };
  }
  const isValid = addIncomeSchema.safeParse(values);

  if (!isValid) {
    return { success: false, message: "invalid data" };
  }

  const { rows } =
    await sql<Balance>`SELECT * FROM balances WHERE "userId" = ${userId}`;
  if (rows.length == 0) {
    await sql`
      INSERT INTO balances ("userId", current, income, expenses)
      VALUES (${userId}, ${values.mainIncome + values.sideIncome}, ${values.mainIncome + values.sideIncome},0)
    `;
  }
  try {
    await sql`
        UPDATE balances
        SET current = ${rows[0].current + values.mainIncome + values.sideIncome},
            income =  ${values.mainIncome + values.sideIncome}
        WHERE "userId" = ${userId}
    `;
    return { success: true, message: "Income added successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Someting went wrong" };
  }
}
