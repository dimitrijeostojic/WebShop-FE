import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // Navbar je sada client komponenta
import './globals.css';

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
        <main className="mt-16">{children}</main>
      </body>
    </html>
  );
}
