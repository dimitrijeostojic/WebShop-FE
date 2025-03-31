import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // Navbar je sada client komponenta
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "My App",
  description: "A Next.js application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
