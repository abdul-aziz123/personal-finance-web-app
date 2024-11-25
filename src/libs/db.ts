import { sql } from "@vercel/postgres";

export async function getAllUsers() {
  const { rows: users } = await sql`SELECT * FROM User`;
  return users;
}

export async function getCreateUsers() {
  const res = await sql`select * from user `;
  return res;
}
