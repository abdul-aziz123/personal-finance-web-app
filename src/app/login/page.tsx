import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirect: true, redirectTo: "/" });
      }}
    >
      <button type="submit">Google</button>
    </form>
  );
}
