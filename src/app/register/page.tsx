import React from "react";
import { TabsDemo } from "@/components/starting";
import Image from "next/image";
import IllustrationAuthentication from "../../../public/assets/images/illustration-authentication.svg";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative hidden lg:flex lg:w-1/2">
        <Image
          src={IllustrationAuthentication}
          alt="Login visual"
          className="h-screen w-full object-cover"
          width={800}
          height={800}
          priority
        />
      </div>
      <div className="flex flex-1 items-center justify-center bg-Beige100 p-4 sm:p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Add Initial Details to your Account
            </h2>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-Grey100" />
              </div>
            </div>

            <TabsDemo />
          </div>
        </div>
      </div>
    </main>
  );
}
