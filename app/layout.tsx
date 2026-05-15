import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Summit Prints — 3D Printed Mountain Models",
  description:
    "Hand-crafted 3D printed topographic models of real hikes and mountains. Own a piece of your favourite summit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f5f0e8] text-slate-800">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="bg-[#2d5016] text-white/70 text-sm text-center py-8 mt-16">
            <p>© {new Date().getFullYear()} Summit Prints · Handcrafted in the Alps</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
