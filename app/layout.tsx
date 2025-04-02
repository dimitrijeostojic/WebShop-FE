"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/register" || pathname==="/";

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {!hideLayout && <Navbar />}
        <main className={!hideLayout ? "pt-20" : ""}>{children}</main>
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
