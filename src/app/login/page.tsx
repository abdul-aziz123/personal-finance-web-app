import Image from "next/image";
import Link from "next/link";
import SocialLogins from "@/components/SocialLogins";
import IllustrationAuthentication from "../../../public/assets/images/illustration-authentication.svg";

export default function LoginPage() {
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
      <div className="flex flex-1 items-center justify-center bg-Beige100 p-4 sm:p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-Grey100" />
              </div>
            </div>

            <SocialLogins />
          </div>

          <p className="text-muted-foreground mt-2 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Register to create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
