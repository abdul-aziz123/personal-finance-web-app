import { sql } from "@vercel/postgres";
import { User } from "next-auth";
import { UserTable } from "./definitions";

export async function getAllUsers() {
  const { rows: users } = await sql`SELECT * FROM User`;
  return users;
}

export async function getCreateUsers(user: User) {
  const { rowCount, rows } =
    await sql<UserTable>`select * from "User" where email = ${user.email}`;
  if (rowCount === 0) {
    const res =
      await sql<UserTable>`INSERT INTO "User" (full_name , email , current_balance) VALUES (${user.name} , ${user.email} , 1000) RETURNING *`;
    return { user: res.rows[0], isNew: true };
  }
  return { user: rows[0], isNew: false };
}
