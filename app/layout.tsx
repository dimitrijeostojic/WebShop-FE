"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
        <Toaster position="top-right" />
        <main className={!hideLayout ? "pt-20" : ""}>{children}</main>
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
