"use server";

import { auth } from "@/auth";
import { Balance } from "@/libs/definitions";
import { addIncomeSchema } from "@/libs/validations";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
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
    revalidatePath("/", "layout");
    return { success: true, message: "Income added successfully" };
  }
  try {
    await sql`
        UPDATE balances
        SET current = ${values.addToCurrent ? rows[0].current + values.mainIncome + values.sideIncome : rows[0].current},
            income =  ${values.mainIncome + values.sideIncome}
        WHERE "userId" = ${userId}
    `;
    revalidatePath("/", "layout");
    return { success: true, message: "Income added successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Someting went wrong" };
  }
}
