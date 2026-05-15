"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-[#2d5016] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              className="w-8 h-8 text-white group-hover:text-stone-200 transition-colors"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 28 L16 6 L28 28 Z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M10 28 L19 14 L28 28 Z"
                fill="white"
                opacity="0.25"
              />
              <path
                d="M14 10 L20 10 L18 6 Z"
                fill="white"
                opacity="0.6"
              />
            </svg>
            <span className="font-bold text-xl tracking-tight">Summit Prints</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-stone-200 transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-stone-200 transition-colors">
              Shop
            </Link>
          </nav>

          {/* Cart icon */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-sm font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-[#2d5016] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
