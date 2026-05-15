"use client";

import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/components/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart({ id: product.id, name: product.name, price: product.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full bg-slate-200 text-slate-400 font-bold py-4 rounded-2xl text-lg cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleAdd}
        className={`w-full font-bold py-4 rounded-2xl text-lg transition-all ${
          added
            ? "bg-green-600 text-white"
            : "bg-[#2d5016] hover:bg-[#3d6b1f] text-white"
        }`}
      >
        {added ? "✓ Added to Cart!" : "Add to Cart"}
      </button>
      {added && (
        <Link
          href="/cart"
          className="w-full text-center border-2 border-[#2d5016] text-[#2d5016] font-semibold py-3 rounded-2xl hover:bg-[#2d5016]/5 transition-colors"
        >
          View Cart →
        </Link>
      )}
    </div>
  );
}
