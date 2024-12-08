import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { Pool } from "@neondatabase/serverless";
import PostgresAdapter from "@auth/pg-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  return {
    pages: {
      signIn: "/login",
    },
    providers: [Google, Github],
    adapter: PostgresAdapter(pool),
  } satisfies NextAuthConfig;
});
