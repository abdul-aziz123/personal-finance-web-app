import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect("/login");
  }
  const user = session.user;
  const { id } = await params;
  const { rows } =
    await sql`SELECT * FROM pots WHERE id = ${id} AND "userId" = ${user.id}`;
  if (rows.length === 0) {
    return NextResponse.json({ message: "Pot not found", success: false });
  }
  return NextResponse.json({ pot: rows[0], success: true });
}
