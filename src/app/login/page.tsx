import Image from "next/image";
import SocialLogins from "@/components/SocialLogins";
import IllustrationAuthentication from "../../../public/illustration-authentication.svg";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Image section - only visible on large screens */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <Image
          src={IllustrationAuthentication}
          alt="Login visual"
          className="h-screen w-full object-cover"
          width={800}
          height={800}
          // objectFit="cover"
          priority
        />
      </div>

      {/* Login form section */}
      <div className="flex flex-1 items-center justify-center bg-beige-100 p-4 sm:p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-Grey100 w-full border-t" />
              </div>
            </div>

            <SocialLogins />
          </div>
        </div>
      </div>
    </div>
  );
}
