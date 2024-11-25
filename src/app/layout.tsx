import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "@/app/globals.css";

const public_sans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${public_sans.className}antialiased`}>{children}</body>
    </html>
  );
}
