"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { formatPrice, getProductById } from "@/lib/products";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Checkout failed");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8">Find your favourite summit and bring it home.</p>
        <Link
          href="/products"
          className="bg-[#2d5016] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#3d6b1f] transition-colors inline-block"
        >
          Browse Models
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 flex items-center gap-5"
            >
              {/* Product thumbnail */}
              {(() => {
                const product = getProductById(item.id);
                return product?.image ? (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={product.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-xl flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 40 30" className="w-10 h-10" fill="none">
                      <path d="M4 28 L20 6 L36 28 Z" fill="white" opacity="0.4" />
                      <path d="M16 12 L22 12 L20 6 Z" fill="white" opacity="0.7" />
                    </svg>
                  </div>
                );
              })()}

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">{item.name}</h3>
                <p className="text-[#2d5016] font-bold mt-0.5">{formatPrice(item.price)}</p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50 font-bold text-slate-600 transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold text-slate-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50 font-bold text-slate-600 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <div className="text-right shrink-0 ml-2">
                <p className="font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 hover:text-red-700 mt-1 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sticky top-24">
            <h2 className="font-bold text-lg text-slate-900 mb-5">Order Summary</h2>

            <div className="space-y-2 text-sm mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-slate-600">
                  <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                  <span className="shrink-0 font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg text-slate-900">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Excl. shipping · VAT included</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#2d5016] hover:bg-[#3d6b1f] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Redirecting...
                </>
              ) : (
                "Checkout with Stripe"
              )}
            </button>

            <Link
              href="/products"
              className="block text-center text-sm text-slate-500 hover:text-[#2d5016] mt-4 transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
