"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      {/* Success icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-slate-600 mb-2">
        Thank you for your purchase. Your mountain models are being prepared.
      </p>
      <p className="text-slate-400 text-sm mb-10">
        A confirmation email will be sent to you shortly.
      </p>

      {/* Mountain illustration */}
      <div className="bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-3xl p-8 mb-10 flex justify-center">
        <svg viewBox="0 0 300 180" className="w-64 h-auto" fill="none">
          <path d="M10 170 L150 20 L290 170 Z" fill="white" opacity="0.2" />
          <path d="M60 170 L165 60 L270 170 Z" fill="white" opacity="0.15" />
          <path d="M135 35 L165 35 L150 20 Z" fill="white" opacity="0.6" />
          {/* Snow cap */}
          <path d="M135 35 L150 20 L165 35 L155 45 L145 45 Z" fill="white" opacity="0.9" />
          {/* Stars */}
          <circle cx="50" cy="40" r="2" fill="white" opacity="0.5" />
          <circle cx="240" cy="55" r="1.5" fill="white" opacity="0.4" />
          <circle cx="200" cy="25" r="2" fill="white" opacity="0.5" />
          <circle cx="80" cy="25" r="1.5" fill="white" opacity="0.3" />
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="bg-[#2d5016] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#3d6b1f] transition-colors"
        >
          Shop More Models
        </Link>
        <Link
          href="/"
          className="border-2 border-stone-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:bg-stone-50 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
